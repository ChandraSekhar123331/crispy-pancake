const session = require("express-session");
const { Client } = require("pg");

const conn_obj = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool_obj = new Client(conn_obj);

// const store = new (require("connect-pg-simple")(session))({
//   conObject,
// });

const store = new (require("connect-pg-simple")(session))({
  pool: pool_obj,
});

const session_store = session({
  store: store,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: false,
    sameSite: false,
    maxAge: 1000 * 60, // in millisec,
  },
});

exports.pool_obj = pool_obj;
exports.session_store = session_store;
