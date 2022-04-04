DROP TABLE IF EXISTS Table_booking;
DROP TABLE IF EXISTS Attended_by;
DROP TABLE IF EXISTS Ingredients;
DROP TABLE IF EXISTS Attendant;
DROP TABLE IF EXISTS Chef;
DROP TABLE IF EXISTS Manager;
DROP TABLE IF EXISTS Ordered_items;
DROP TABLE IF EXISTS Dish;
DROP TABLE IF EXISTS Stock;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS tbl;
DROP TABLE IF EXISTS Bill;
DROP TABLE IF EXISTS Employee;

CREATE TABLE Employee (
  emp_id bigserial,
  user_name varchar,
  emp_name varchar,
  email_id varchar,
  phone_number varchar,
  emp_address varchar,
  emp_password varchar,
  emp_role varchar,
  salary bigint,
  PRIMARY KEY(emp_id),
  UNIQUE (user_name)
);

CREATE TABLE Bill (
  bill_id bigserial,
  bill_time timestamp,
  order_type varchar,
  rating int,
  PRIMARY KEY (bill_id)
);

CREATE TABLE tbl (
  table_id bigserial,
  position varchar,
  occupancy int,
  PRIMARY KEY (table_id)
);

CREATE TABLE Customer (
  customer_id bigserial,
  user_name varchar,
  full_name varchar,
  email_id varchar,
  phone_number varchar,
  cust_address varchar,
  cust_password varchar,
  PRIMARY KEY (customer_id)
);

CREATE TABLE Stock (
  stock_id bigserial,
  stock_name varchar,
  quantity_left int,
  min_required int,
  price_per_unit int,
  PRIMARY KEY (stock_id)
);

CREATE TABLE Dish (
  dish_id bigserial,
  dish_name varchar,
  is_veg boolean,
  cuisine varchar,
  item_type varchar,
  profit_percentage int,
  PRIMARY KEY (dish_id)
);

CREATE TABLE Ordered_items (
  bill_id bigint,
  dish_id bigint,
  quantity int,
  rating int,
  PRIMARY KEY (bill_id, dish_id),
  FOREIGN KEY (bill_id) REFERENCES Bill,
  FOREIGN KEY (dish_id) REFERENCES Dish
);

CREATE TABLE Manager (
  manager_id bigint,
  skill varchar,
  PRIMARY KEY (manager_id),
  FOREIGN KEY (manager_id) REFERENCES Employee
);

CREATE TABLE Chef (
  chef_id bigint,
  specialization varchar,
  PRIMARY KEY (chef_id),
  FOREIGN KEY (chef_id) REFERENCES Employee
);

CREATE TABLE Attendant (
  attendant_id bigint,
  attendant_role varchar,
  PRIMARY KEY (attendant_id),
  FOREIGN KEY (attendant_id) REFERENCES Employee
);

CREATE TABLE Ingredients (
  dish_id bigint,
  stock_id bigint,
  quantity int,
  PRIMARY KEY (dish_id, stock_id),
  FOREIGN KEY (dish_id) REFERENCES Dish,
  FOREIGN KEY (stock_id) REFERENCES Stock
);

CREATE TABLE Attended_by (
  bill_id bigint,
  attendant_id bigint,
  rating int,
  PRIMARY KEY (bill_id, attendant_id),
  FOREIGN KEY (bill_id) REFERENCES Bill,
  FOREIGN KEY (attendant_id) REFERENCES Attendant
);

CREATE TABLE Table_booking (
  customer_id bigint,
  table_id bigint,
  day date,
  start_time timestamp,
  end_time timestamp,
  PRIMARY KEY (customer_id, table_id, day, start_time),
  FOREIGN KEY (customer_id) REFERENCES Customer,
  FOREIGN KEY (table_id) REFERENCES tbl
);

