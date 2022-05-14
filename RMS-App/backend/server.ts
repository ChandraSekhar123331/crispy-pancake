import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import session from 'express-session';
import bcrypt from 'bcryptjs';

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
        type: string;
    }
}

const app = express();
app.use(express.urlencoded({ extended: true }), express.json(), cors({
    origin: ['http://localhost:4200'],
    credentials: true
}), session({
    secret: 'crispy-pancakes-sk',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}), (req, res, next) => {
    const noAuth = ['/entry/register', '/entry/login/customer', '/entry/login/employee', '/entry/login/admin', '/entry/type'];
    if (noAuth.includes(req.path) || req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized access.');
    }
    // next();
});

const pool = new Pool({
    user: 'postgres',
    password: ' ',
    database: 'dbproj'
});
pool.connect().then();

console.log('\x1b[32m%s\x1b[0m', '[+] Database connection established.');

app.post('/entry/register', (req, res) => {
    let { emailId, userName, fullName, password, phoneNumber, address } = req.body;
    password = bcrypt.hashSync(password, 10);
    pool.query('INSERT INTO customer (email_id, user_name, full_name, cust_password, phone_number, cust_address) VALUES ($1, $2, $3, $4, $5, $6)', [emailId, userName, fullName, password, phoneNumber, address], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.status(200).json(result);
        }
    });
});

app.post('/entry/login/:type', (req, res) => {
    let credentials, field;
    if (req.body.emailId === '' || req.body.emailId === undefined) {
        credentials = req.body.userName;
        field = 'user_name';
    }
    else {
        credentials = req.body.emailId;
        field = 'email_id';
    }
    pool.query('SELECT * FROM ' + req.params.type + ' WHERE ' + field + ' = $1', [credentials], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            const pw_field = req.params.type === 'customer' ? 'cust_password' : 'emp_password';
            if (bcrypt.compareSync(req.body.password, result.rows[0][pw_field])) {
                req.session.user = result.rows[0];
                req.session.type = req.params.type;
                req.session.user!.type = req.params.type;
                res.status(200).json(req.session.user);
            } else {
                res.status(400).send('Invalid credentials.');
            }
        }
    });
});

app.post('/entry/type', (req, res) => {
    res.json({ type: req.session.type });
});

app.post('/entry/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Logged out successfully.' });
    });
});

app.get('/main/menu/:skip/:limit', (req, res) => {
    const { skip, limit } = req.params;
    pool.query('SELECT * FROM (select * from menu order by dish_name) tmp LIMIT $1 OFFSET $2', [limit, skip], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            const dishes = result.rows;

            pool.query('SELECT count(*) FROM menu', (err, result) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    res.status(200).json({ dishes, total: result.rows[0].count });
                }
            });
        }
    });
});

app.post('/admin/register-employee', async (req, res) => {
    const { email, firstName, lastName, phone, address, salary, role, attendantType, chefSpecialization, managerSkill } = req.body;
    const empName = firstName + ' ' + lastName;
    let username = email.split('@')[0];
    while (true) {
        const result = await pool.query('SELECT * FROM employee WHERE user_name = $1', [username]);
        if (result.rows.length === 0) {
            break;
        } else {
            username = username + Math.floor(Math.random() * 10);
        }
    }
    const password = Math.random().toString(36).substring(2, 15);
    const hash = bcrypt.hashSync(password, 10);
    pool.query('INSERT INTO employee (emp_name, email_id, phone_number, emp_address, salary, emp_role, user_name, emp_password, fired) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, \'f\')', [empName, email, phone, address, salary, role, username, hash], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            pool.query('SELECT emp_id FROM employee WHERE email_id = $1', [email], (err, result) => {
                const second_column = {
                    'attendant': 'attendant_role',
                    'chef': 'specialization',
                    'manager': 'skill'
                }[role as string] as string;
                const second_value = {
                    'attendant': attendantType,
                    'chef': chefSpecialization,
                    'manager': managerSkill + '-manager'
                }[role as string];
                pool.query('INSERT INTO ' + role + ' (' + role + '_id, ' + second_column + ') VALUES ($1, $2)', [result.rows[0].emp_id, second_value], (err, result) => {
                    if (err) {
                        res.status(400).send(err.message);
                    } else {
                        res.json({ status: 'OK', username, password });
                    }
                });
            });
        }
    });
});

app.get('/admin/search-employee/:username/:empStatus', (req, res) => {
    pool.query('SELECT * FROM employee WHERE user_name = $1 AND fired = $2', [req.params.username, req.params.empStatus], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            const employee = result.rows[0];
            if (!employee) {
                res.json(null);
                return;
            }
            pool.query('SELECT * FROM ' + employee.emp_role + ' WHERE ' + employee.emp_role + '_id = $1', [employee.emp_id], (err, result) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    const second_column = {
                        'attendant': 'attendant_role',
                        'chef': 'specialization',
                        'manager': 'skill'
                    }[employee.emp_role as string] as string;

                    employee.emp_role = employee.emp_role.charAt(0).toUpperCase() + employee.emp_role.slice(1);

                    let role2 = result.rows[0][second_column];
                    if (employee.emp_role === 'Manager')
                        role2 = (role2 as string).split('-')[0];
                    role2 = role2.charAt(0).toUpperCase() + (role2.length === 2 ? role2.slice(1).toUpperCase() : role2.slice(1));
                    employee.emp_role = `${employee.emp_role} (${role2})`;
                    res.json(employee);
                }
            });
        }
    });
});

app.post('/admin/fire-employee/:username', (req, res) => {
    pool.query('UPDATE employee SET fired = \'t\' WHERE user_name = $1', [req.params.username], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json({ status: 'OK' });
        }
    });
});

app.get('/main/dish/:id', (req, res) => {
    pool.query('SELECT * FROM menu WHERE dish_id = $1', [req.params.id], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result.rows[0]);
        }
    });
});

app.post('/main/order', (req, res) => {
    const customer_id = req.session.user!.customer_id;
    const bill_time = new Date();

    pool.query('INSERT INTO bill (customer_id, bill_time, order_type) VALUES ($1, $2, \'online\') RETURNING bill_id', [customer_id, bill_time], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            const bill_id = result.rows[0].bill_id;
            const ls: number[] = [];
            let ret = false;
            for (const { dish_id, quantity } of req.body) {
                ls.push(0);
                pool.query('SELECT * FROM menu WHERE dish_id = $1', [dish_id], (err, result) => {
                    if (err) {
                        res.status(400).send(err.message);
                    } else {
                        const dish = result.rows[0];
                        pool.query('INSERT INTO ordered_items (bill_id, dish_id, quantity, price_per_unit) VALUES ($1, $2, $3, $4)', [bill_id, dish_id, quantity, dish.dish_price], (err, result) => {
                            if (err && !ret) {
                                res.status(400).send(err.message);
                                ret = true;
                            } else {
                                ls.pop();
                            }
                        });
                    }
                });
            }
            const interval = setInterval(() => {
                if (ret) {
                    clearInterval(interval);
                } else if (ls.length === 0) {
                    res.json({ billId: bill_id, orders: req.body });
                    clearInterval(interval);
                }
            }, 100);
        }
    });
});

app.get('/main/free-waiters', (req, res) => {
    pool.query('SELECT emp_id, emp_name, count(*) experience, case when count(rating) = 0 then 2.5 else 1.0 * sum(rating) / count(rating) end rating FROM employee, attendant, attended_by WHERE emp_id = attendant.attendant_id AND attendant.attendant_id = attended_by.attendant_id AND attendant_role = \'hotel\' AND fired = \'f\' AND delivered = \'t\' GROUP BY emp_id, emp_name ORDER BY rating desc, experience desc limit 20;', (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result.rows);
        }
    });
});

app.get('/main/customer-info/:username', (req, res) => {
    pool.query('SELECT * FROM customer WHERE user_name = $1', [req.params.username], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result.rows[0]);
        }
    });
});

app.get('/main/vacant-tables/:position/:occupancy', (req, res) => {
    const time = new Date();
    const { position, occupancy } = req.params;

    pool.query('select table_id, occupancy from tbl where table_id not in (select table_id from table_booking where $1 between start_time and end_time) and position = $2 and occupancy >= $3;', [time, position, occupancy], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result.rows);
        }
    });
});

app.post('/main/book-table', (req, res) => {
    const { table_id, customer_id } = req.body;
    const start_time = new Date();
    const end_time = new Date(start_time.getTime() + 45 * 60 * 1000);

    pool.query('INSERT INTO bill (customer_id, bill_time, order_type) VALUES ($1, $2, \'hotel\') RETURNING bill_id', [customer_id, start_time], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            const bill_id = result.rows[0].bill_id;
            pool.query('INSERT INTO table_booking (table_id, bill_id, start_time, end_time) VALUES ($1, $2, $3, $4)', [table_id, bill_id, start_time, end_time], (err, result) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    res.json({ billId: bill_id });
                }
            });
        }
    });
});

app.post('/main/assign-waiter', (req, res) => {
    const { waiter, bill } = req.body;
    console.log(waiter, bill);
    pool.query('INSERT INTO attended_by (bill_id, attendant_id, delivered) VALUES ($1, $2, \'f\')', [bill, waiter], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json({ status: 'OK' });
        }
    });
});

app.get('/main/active-bill/:waiter', (req, res) => {
    pool.query('select bill_id, table_id, full_name from bill natural join attended_by natural join customer natural join table_booking where delivered = \'f\' and attendant_id = $1;', [req.params.waiter], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result.rows[0]);
        }
    });
});

app.listen(3000, () => {
    console.log('\x1b[32m%s\x1b[0m', '[+] Server started on port 3000.');
});