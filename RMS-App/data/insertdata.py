import argparse
import csv
import psycopg2
from psycopg2 import extras
import time


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--name", type=str, required=True,
                        help="database name")
    parser.add_argument("--user", type=str, required=True, help="username")
    parser.add_argument("--passwd", type=str, required=True,
                        help="password")
    parser.add_argument("--host", type=str, required=True,
                        help="host address")
    parser.add_argument("--port", type=str, required=True,
                        help="port for database connection")
    parser.add_argument("--ddl", type=str, required=True,
                        help="Path to ddl file")
    # parser.add_argument("--data", type=str, required=True,
    #                     help="Path to data **folder**")

    return vars(parser.parse_args())


def handle_null(key):
    return None if key.lower() == "null" else key


def parse(row, cols):
    # header_str = ", ".join([_["col_name"] for _ in cols])
    serial_cols = []
    normal_cols = []
    serial_cols_values = []
    normal_cols_values = []
    format_spec = []
    for col in cols:
        col_name = col["col_name"]
        type_func = col["type_func"]
        if col.get("method", None) is None:
            val = handle_null(row[col_name])
            # values.append(val if val is None else type_func(val))
            normal_cols.append(col_name)
            normal_cols_values.append(val)
            format_spec.append("%s")
        else:
            serial_cols.append(col_name)
            serial_cols_values.append("lastval()")
    header_str = ", ".join(serial_cols + normal_cols)
    serial_values = ", ".join(serial_cols_values)
    if len(serial_cols_values) != 0:
        serial_values += ', '

    return header_str, serial_values, tuple(normal_cols_values), ", ".join(format_spec)


if __name__ == "__main__":
    all_args = get_args()
    dbname = all_args["name"]
    user = all_args["user"]
    password = all_args["passwd"]
    host = all_args["host"]
    port = all_args["port"]
    ddl_path = all_args["ddl"]
    # Set up connection
    conn = psycopg2.connect(
        user=user,
        password=password,
        database=dbname,
        host=host,
        port=port,
    )
    cursor = conn.cursor()
    t0 = time.time()
    # Install ddl
    with open(ddl_path) as file:
        text = file.read().strip()
        cursor.execute(text)
    t1 = time.time()
    time_ddl = t1-t0
    employee_cols = [
        {"col_name": "user_name", "type_func": str},
        {"col_name": "emp_name", "type_func": str},
        {"col_name": "email_id", "type_func": str},
        {"col_name": "phone_number", "type_func": str},
        {"col_name": "emp_address", "type_func": str},
        {"col_name": "emp_password", "type_func": str},
        {"col_name": "emp_role", "type_func": str},
        {"col_name": "salary", "type_func": int},
    ]

    bill_cols = [
        {"col_name": "customer_id", "type_func": int},
        {"col_name": "bill_time", "type_func": str},
        {"col_name": "order_type", "type_func": str},
        {"col_name": "rating", "type_func": int},
    ]

    tbl_cols = [
        {"col_name": "position", "type_func": str},
        {"col_name": "occupancy", "type_func": int},
    ]

    customer_cols = [
        {"col_name": "user_name", "type_func": str},
        {"col_name": "full_name", "type_func": str},
        {"col_name": "email_id", "type_func": str},
        {"col_name": "phone_number", "type_func": str},
        {"col_name": "cust_address", "type_func": str},
        {"col_name": "cust_password", "type_func": str},
    ]

    stock_cols = [
        {"col_name": "stock_name", "type_func": str},
        {"col_name": "quantity_left", "type_func": int},
        {"col_name": "min_required", "type_func": int},
        {"col_name": "price_per_unit", "type_func": int},
    ]

    dish_cols = [
        {"col_name": "dish_name", "type_func": str},
        {"col_name": "is_veg", "type_func": str},
        {"col_name": "cuisine", "type_func": str},
        {"col_name": "item_type", "type_func": str},
        {"col_name": "profit_percentage", "type_func": int},
    ]

    ordered_items_cols = [
        {"col_name": "bill_id", "type_func": int},
        {"col_name": "dish_id", "type_func": int},
        {"col_name": "quantity", "type_func": int},
        {"col_name": "price_per_unit", "type_func": float},
        {"col_name": "rating", "type_func": int},
    ]

    manager_cols = [
        {"col_name": "manager_id", "method": "auto", "type_func": int},
        {"col_name": "skill", "type_func": str},
    ]

    chef_cols = [
        {"col_name": "chef_id", "method": "auto", "type_func": int},
        {"col_name": "specialization", "type_func": str},
    ]

    attendant_cols = [
        {"col_name": "attendant_id", "method": "auto", "type_func": int},
        {"col_name": "attendant_role", "type_func": str},
    ]

    ingredients_cols = [
        {"col_name": "dish_id", "type_func": int},
        {"col_name": "stock_id", "type_func": int},
        {"col_name": "quantity", "type_func": int},
    ]

    attended_by_cols = [
        {"col_name": "bill_id", "type_func": int},
        {"col_name": "attendant_id", "type_func": int},
        {"col_name": "rating", "type_func": int},
    ]

    table_booking_cols = [
        {"col_name": "bill_id", "type_func": int},
        {"col_name": "table_id", "type_func": int},
        {"col_name": "start_time", "type_func": str},
        {"col_name": "end_time", "type_func": str},
    ]

    t0 = time.time()
    # There is a big problem ahead if we are inserting first into manager or chef.
    # Keep the attendant first in this insertdata.py file.
    with open("data_folder/attendant.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, employee_cols)
            sql = f"""INSERT INTO employee ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)
            header_str, serial_values, values_list, format_spec = parse(
                row, attendant_cols)
            sql = f"""INSERT INTO attendant ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

        # cursor.execute("SELECT * From attendant")
        # res = cursor.fetchall()
        # print(res)

    with open("data_folder/manager.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, employee_cols)
            sql = f"""INSERT INTO employee ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)
            header_str, serial_values, values_list, format_spec = parse(
                row, manager_cols)
            sql = f"""INSERT INTO manager ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/chef.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, employee_cols)
            sql = f"""INSERT INTO employee ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)
            header_str, serial_values, values_list, format_spec = parse(
                row, chef_cols)
            sql = f"""INSERT INTO chef ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/customer.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, customer_cols)
            sql = f"""INSERT INTO customer ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/bill.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, bill_cols)
            sql = f"""INSERT INTO bill ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/tbl.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, tbl_cols)
            sql = f"""INSERT INTO tbl ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/stock.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, stock_cols)
            sql = f"""INSERT INTO stock ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/dish.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, dish_cols)
            sql = f"""INSERT INTO dish ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/ordered_items.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, ordered_items_cols)
            sql = f"""INSERT INTO ordered_items ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/ingredients.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, ingredients_cols)
            sql = f"""INSERT INTO ingredients ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/attended_by.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, attended_by_cols)
            sql = f"""INSERT INTO attended_by ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    with open("data_folder/table_booking.csv") as file:
        reader = csv.DictReader(file)
        for row in reader:
            header_str, serial_values, values_list, format_spec = parse(
                row, table_booking_cols)
            sql = f"""INSERT INTO table_booking ({header_str}) VALUES ({serial_values} {format_spec})"""
            cursor.execute(sql, values_list)

    conn.commit()
    t1 = time.time()
    time_insert = t1 - t0
    # end timer
    # With execute_values time around 1.5 seconds.
    # With execute_many time is around 6.25 seconds.
    # print(f"time_ddl = {time_ddl}, time_insert = {time_insert}")

    cursor.close()
    conn.close()
