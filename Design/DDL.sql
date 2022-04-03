DROP TABLE "Table_booking";
DROP TABLE "Attended_by";
DROP TABLE "Ingredients";
DROP TABLE "Attendant";
DROP TABLE "Chef";
DROP TABLE "Manager";
DROP TABLE "Ordered_items";
DROP TABLE "Dish";
DROP TABLE "Stock";
DROP TABLE "Customer";
DROP TABLE "Table";
DROP TABLE "Bill";
DROP TABLE "Employee";

CREATE TABLE "Employee" (
  "employee_id" bigserial,
  "user_name" varchar,
  "name" varchar,
  "email_id" varchar,
  "phone" varchar,
  "address" varchar,
  "password" varchar,
  "role" varchar,
  "salary" bigint,
  PRIMARY KEY("employee_id"),
  UNIQUE ("user_name")
);

CREATE TABLE "Bill" (
  "bill_id" bigserial,
  "timestamp" timestamp,
  "order_type" varchar,
  "rating" int,
  PRIMARY KEY ("bill_id")
);

CREATE TABLE "Table" (
  "table_id" bigserial,
  "position" varchar,
  "occupancy" int,
  PRIMARY KEY ("table_id")
);

CREATE TABLE "Customer" (
  "customer_id" bigserial,
  "user_name" varchar,
  "name" varchar,
  "email_id" varchar,
  "phone number" varchar,
  "address" varchar,
  "password" varchar,
  PRIMARY KEY ("customer_id")
);

CREATE TABLE "Stock" (
  "stock_id" bigserial,
  "name" varchar,
  "quantity_left" int,
  "min_required" int,
  "price_per_unit" int,
  PRIMARY KEY ("stock_id")
);

CREATE TABLE "Dish" (
  "dish_id" bigserial,
  "name" varchar,
  "is_veg" boolean,
  "cuisine" varchar,
  "item_type" varchar,
  "profit" int,
  PRIMARY KEY ("dish_id")
);

CREATE TABLE "Ordered_items" (
  "bill_id" bigint,
  "dish_id" bigint,
  "quantity" int,
  "rating" int,
  PRIMARY KEY ("bill_id", "dish_id"),
  FOREIGN KEY ("bill_id") REFERENCES "Bill",
  FOREIGN KEY ("dish_id") REFERENCES "Dish"
);

CREATE TABLE "Manager" (
  "manager_id" bigint,
  "skill" varchar,
  PRIMARY KEY ("manager_id"),
  FOREIGN KEY ("manager_id") REFERENCES "Employee"
);

CREATE TABLE "Chef" (
  "chef_id" bigint,
  "specialization" varchar,
  PRIMARY KEY ("chef_id"),
  FOREIGN KEY ("chef_id") REFERENCES "Employee"
);

CREATE TABLE "Attendant" (
  "attendant_id" bigint,
  "role" varchar,
  PRIMARY KEY ("attendant_id"),
  FOREIGN KEY ("attendant_id") REFERENCES "Employee"
);

CREATE TABLE "Ingredients" (
  "dish_id" bigint,
  "stock_id" bigint,
  "quantity" int,
  PRIMARY KEY ("dish_id", "stock_id"),
  FOREIGN KEY ("dish_id") REFERENCES "Dish",
  FOREIGN KEY ("stock_id") REFERENCES "Stock"
);

CREATE TABLE "Attended_by" (
  "bill_id" bigint,
  "attendant_id" bigint,
  "rating" int,
  PRIMARY KEY ("bill_id", "attendant_id"),
  FOREIGN KEY ("bill_id") REFERENCES "Bill",
  FOREIGN KEY ("attendant_id") REFERENCES "Attendant"
);

CREATE TABLE "Table_booking" (
  "customer_id" bigint,
  "table_id" bigint,
  "day" date,
  "start_time" timestamp,
  "end_time" timestamp,
  PRIMARY KEY ("customer_id", "table_id", "day", "start_time"),
  FOREIGN KEY ("customer_id") REFERENCES "Customer",
  FOREIGN KEY ("table_id") REFERENCES "Table"
);

