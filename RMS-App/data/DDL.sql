DROP TABLE IF EXISTS Table_booking CASCADE;
DROP TABLE IF EXISTS Attended_by CASCADE;
DROP TABLE IF EXISTS Ingredients CASCADE;
DROP TABLE IF EXISTS Attendant CASCADE;
DROP TABLE IF EXISTS Chef CASCADE;
DROP TABLE IF EXISTS Manager CASCADE;
DROP TABLE IF EXISTS Ordered_items CASCADE;
DROP TABLE IF EXISTS Dish CASCADE;
DROP TABLE IF EXISTS Stock CASCADE;
DROP TABLE IF EXISTS tbl CASCADE;
DROP TABLE IF EXISTS Bill CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS Employee CASCADE;
DROP TABLE IF EXISTS session CASCADE;
-- This session part is directly taken from the node_modules/connect-pg-simple/table.sql

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

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


CREATE TABLE Bill (
  bill_id bigserial,
  customer_id bigint, 
  bill_time timestamp,
  order_type varchar,
  rating int,
  PRIMARY KEY (bill_id),
  FOREIGN KEY (customer_id) REFERENCES Customer
);

CREATE TABLE tbl (
  table_id bigserial,
  position varchar,
  occupancy int,
  PRIMARY KEY (table_id)
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
  PRIMARY KEY (bill_id),
  FOREIGN KEY (bill_id) REFERENCES Bill,
  FOREIGN KEY (attendant_id) REFERENCES Attendant
);

CREATE TABLE Table_booking (
  bill_id bigint,
  table_id bigint,
  start_time timestamp,
  end_time timestamp,
  PRIMARY KEY (bill_id, table_id),
  FOREIGN KEY (bill_id) REFERENCES Bill,
  FOREIGN KEY (table_id) REFERENCES tbl
);

CREATE MATERIALIZED VIEW if not exists MENU as 
select dish.dish_id,
dish.dish_name,
sum(ing.quantity * stock.price_per_unit) * (1 + dish.profit_percentage/100.0) as dish_price
from ingredients as ing, stock, dish
where ing.stock_id = stock.stock_id
AND dish.dish_id = ing.dish_id
group by(dish.dish_id)
ORDER BY dish_price DESC
with data


