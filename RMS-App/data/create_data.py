from asyncore import write
import csv
from datetime import datetime, timedelta
from random import random
import numpy as np
from faker import Faker
import random

rng = np.random.default_rng(seed=0)
num_attendants = 1000
num_chefs = 1000
num_managers = 1000
num_customers = 1000
num_tables = 100


num_bills = 10000
bill_types = ["online delivery", "dine-in"]
# num_table_bookings = 1000

attendant_roles = ["online", "hotel"]
cuisines = [
    "French",
    "Lebanese",
    "Angolan",
    "Argentinian",
    "Bolivian",
    "Cameroonian",
    "Chadian",
    "Congolese",
    "Centrafrican",
    "Equatorial Guinea",
    "Gabonese",
    "Santomean",
    "East African",
    "Burundian ",
    "Djiboutian",
    "Eritrean",
    "Ethiopian",
    "Kenyan",
    "Maasai",
    "Rwandan",
    "Somali",
    "South Sudanese ",
    "Tanzanian",
    "Zanzibari",
    "Ugandan",
    "North African",
]

manager_roles = [
    "db-manager",
    "hr-manager",
    "chef-manager",
    "attendant-manager",
    "cleanliness-manager",
    "attendant-manager",
    "stock-manager",
    "head-manager",
    "trainee-manager",
]
veg_stock = [
    "milk",
    "water",
    "pepper",
    "salt",
    "carrot",
    "beetroot",
    "banana",
    "cabbage",
    "capsicum",
    "chilli",
    "sweet corn",
    "bottle guard",
    "snake guard",
    "sugar",
    "radish",
    "tomato",
    "apple",
    "cheese",
    "ghee",
    "peanut oil",
    "sunflower oil",
    "soya",
    "vermicelli",
    "rice",
    "wheat flour",
    "peanut",
    "bread",
    "jam",
    "curd",
    "mango",
    "orange",
    "custard",
    "cinnamon",
    "coriander",
    "coke",
    "chocolate",
    "icecream",
    "sprite",
    "sauce",
    "Cashew",
    "Badam",
]

non_veg_stock = [
    "chicken",
    "fish",
    "prawns",
    "mutton",
    "lamb",
    "crab",
    "crayfish",
    "egg",
]

dishes = [
    {"dish_name": "veg burger", "is_veg": True, "item_type": "Snack"},
    {"dish_name": "pizza", "is_veg": True, "item_type": "Snack"},
    {"dish_name": "Pasta", "is_veg": True, "item_type": "Snack"},
    {"dish_name": "Pav Bhaji", "is_veg": True, "item_type": "Snack"},
    {"dish_name": "Butter Chicken", "is_veg": False, "item_type": "Curry"},
    {"dish_name": "Mutton Pulusu", "is_veg": False, "item_type": "Curry"},
    {"dish_name": "Dal", "is_veg": True, "item_type": "Curry"},
    {"dish_name": "Kadai veg", "is_veg": True, "item_type": "Curry"},
    {"dish_name": "Mixed veg", "is_veg": True, "item_type": "Curry"},
    {"dish_name": "Paneer Butter Masala", "is_veg": True, "item_type": "Curry"},
    {"dish_name": "Cashew Butter Masala", "is_veg": True, "item_type": "Curry"},
    {"dish_name": "Chicken Fry Masala", "is_veg": True, "item_type": "Curry"},
    {"dish_name": "Chicken Fry", "is_veg": True, "item_type": "Curry"},
    {"dish_name": "Butter Naan", "is_veg": True, "item_type": "Roti"},
    {"dish_name": "Roti", "is_veg": True, "item_type": "Roti"},
    {"dish_name": "Chicken Biryani", "is_veg": False, "item_type": "Biryani"},
    {"dish_name": "Paneer Biryani", "is_veg": True, "item_type": "Biryani"},
    {"dish_name": "Dhum Biryani", "is_veg": False, "item_type": "Biryani"},
    {"dish_name": "Mutton Biryani", "is_veg": False, "item_type": "Biryani"},
    {"dish_name": "Prawns Biryani", "is_veg": False, "item_type": "Biryani"},
    {"dish_name": "Masala Dosa", "is_veg": True, "item_type": "Dosa"},
    {"dish_name": "Paneer Dosa", "is_veg": True, "item_type": "Dosa"},
    {"dish_name": "Egg Dosa", "is_veg": False, "item_type": "Dosa"},
    {"dish_name": "Upma Dosa", "is_veg": True, "item_type": "Dosa"},
    {"dish_name": "Pesara Dosa", "is_veg": True, "item_type": "Dosa"},
    {"dish_name": "Gulab Jamun", "is_veg": True, "item_type": "Desert"},
    {"dish_name": "Chocolate Brownie", "is_veg": True, "item_type": "Desert"},
    {"dish_name": "Oreo", "is_veg": True, "item_type": "Milk shake"},
    {"dish_name": "Kitkat", "is_veg": True, "item_type": "Milk shake"},
    {"dish_name": "Brownie", "is_veg": True, "item_type": "Milk shake"},
    {"dish_name": "Chocoblast", "is_veg": True, "item_type": "Milk shake"},
]

stock = [{"name": name, "is_veg": True} for name in veg_stock] + [
    {"name": name, "is_veg": False} for name in non_veg_stock
]

num_stock = len(stock)
num_dishes = len(dishes)

all_used_names = set()

stock_prices = {}
dish_profits = {}
dish_prices = {}


def get_user_name(faker, used_names):
    name = faker.name()
    while name in used_names:
        name = faker.name()
    used_names.add(name)
    return name


def create_attendant_data(faker: Faker()):
    header = [
        "user_name",
        "emp_name",
        "email_id",
        "phone_number",
        "emp_address",
        "emp_password",
        "emp_role",
        "salary",
        "attendant_role",
    ]
    with open("data_folder/attendant.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        for _ in range(num_attendants):
            entries = [
                get_user_name(faker, all_used_names),
                faker.name(),
                faker.email(),
                faker.phone_number(),
                faker.address(),
                faker.password(),
                "attendant",
                rng.choice(np.arange(20000, 30000)),
                attendant_roles[rng.choice(np.arange(len(attendant_roles)))],
            ]
            writer.writerow(entries)


def create_chef_data(faker: Faker()):
    header = [
        "user_name",
        "emp_name",
        "email_id",
        "phone_number",
        "emp_address",
        "emp_password",
        "emp_role",
        "salary",
        "specialization",
    ]
    with open("data_folder/chef.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        for _ in range(num_chefs):
            entries = [
                get_user_name(faker, all_used_names),
                faker.name(),
                faker.email(),
                faker.phone_number(),
                faker.address(),
                faker.password(),
                "chef",
                rng.choice(np.arange(30000, 80000)),
                cuisines[rng.choice(np.arange(len(cuisines)))],
            ]
            writer.writerow(entries)


def create_manager_data(faker: Faker()):
    header = [
        "user_name",
        "emp_name",
        "email_id",
        "phone_number",
        "emp_address",
        "emp_password",
        "emp_role",
        "salary",
        "skill",
    ]
    with open("data_folder/manager.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        for _ in range(num_managers):
            entries = [
                get_user_name(faker, all_used_names),
                faker.name(),
                faker.email(),
                faker.phone_number(),
                faker.address(),
                faker.password(),
                "manager",
                rng.choice(np.arange(30000, 80000)),
                manager_roles[rng.choice(np.arange(len(manager_roles)))],
            ]
            writer.writerow(entries)


def create_customer_data(faker: Faker()):
    header = [
        "user_name",
        "full_name",
        "email_id",
        "phone_number",
        "cust_address",
        "cust_password",
    ]
    with open("data_folder/customer.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        for _ in range(num_customers):
            entries = [
                get_user_name(faker, all_used_names),
                faker.name(),
                faker.email(),
                faker.phone_number(),
                faker.address(),
                faker.password(),
            ]
            writer.writerow(entries)


def create_stock_data():
    header = [
        "stock_name",
        "quantity_left",
        "min_required",
        "price_per_unit",
    ]
    with open("data_folder/stock.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        for ind, item in enumerate(stock):
            min_qt = rng.choice(10)
            qt_available = rng.choice(np.arange(10, 50)) + min_qt
            entries = [item["name"], qt_available,
                       min_qt, rng.choice(500) + 50]
            stock_prices[1 + ind] = entries[3]
            writer.writerow(entries)


def create_dish_data():
    header = [
        "dish_name",
        "is_veg",
        "cuisine",
        "item_type",
        "profit_percentage",
    ]
    with open("data_folder/dish.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        for ind, dish in enumerate(dishes):
            profit_percentage = 15 + rng.choice(50)
            cuisine = cuisines[rng.choice(len(cuisines))]
            entries = [
                dish["dish_name"],
                dish["is_veg"],
                cuisine,
                dish["item_type"],
                profit_percentage,
            ]
            dish_profits[1 + ind] = profit_percentage
            writer.writerow(entries)


def create_table_data():
    header = [
        "position",
        "occupancy",
    ]
    with open("data_folder/tbl.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        used_posns = set()
        for _ in range(num_tables):
            occupancy = rng.choice(8) + 2
            x = rng.choice(100)
            y = rng.choice(100)
            floor = rng.choice(10)
            while (x, y, floor) in used_posns:
                x = rng.choice(100)
                y = rng.choice(100)
                floor = rng.choice(10)
            used_posns.add((x, y, floor))
            entries = [
                f"x = {x}, y = {y}, floor = {floor}",
                occupancy
            ]
            writer.writerow(entries)


def create_ingredients_data():
    header = [
        "dish_id",
        "stock_id",
        "quantity",
    ]
    with open("data_folder/ingredients.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        for dish_id, dish in enumerate(dishes):
            dish_prices[dish_id + 1] = 0
            ingred_count = 5
            # TODO: Right now we are using any ingred irresp of it is veg or not.
            ingreds = random.sample(range(1, 1 + len(stock)), ingred_count)
            for ingred_id in ingreds:
                quantity = 2 + rng.choice(10)
                entries = [
                    dish_id + 1,
                    ingred_id,
                    quantity
                ]
                dish_prices[dish_id + 1] += stock_prices[ingred_id] * quantity
                writer.writerow(entries)
            dish_prices[dish_id + 1] *= (1+dish_profits[dish_id + 1]/100)


def create_bill_data():
    bill_header = [
        "customer_id",
        "bill_time",
        "order_type",
        "rating",
    ]

    ordered_items_header = [
        "bill_id",
        "dish_id",
        "quantity",
        "price_per_unit",
        "rating",
    ]

    tbl_booking_header = [
        "bill_id",
        "table_id",
        "start_time",
        "end_time",
    ]

    attended_by_header = [
        "bill_id",
        "attendant_id",
        "rating",
    ]

    with open("data_folder/bill.csv", "w", newline="") as bill_file:
        with open("data_folder/ordered_items.csv", "w", newline="") as ordered_items_file:
            with open("data_folder/table_booking.csv", "w", newline="") as table_booking_file:
                with open("data_folder/attended_by.csv", "w", newline="") as attended_by_file:
                    bill_writer = csv.writer(bill_file)
                    ord_items_writer = csv.writer(ordered_items_file)
                    tbl_booking_writer = csv.writer(table_booking_file)
                    att_by_writer = csv.writer(attended_by_file)

                    bill_writer.writerow(bill_header)
                    ord_items_writer.writerow(ordered_items_header)
                    tbl_booking_writer.writerow(tbl_booking_header)
                    att_by_writer.writerow(attended_by_header)

                    curr_time = datetime.today()
                    for bill_id in range(1, num_bills + 1):

                        btype = random.sample(bill_types, 1)[0]
                        if btype == "online delivery":
                            customer_id = rng.choice(num_customers) + 1
                            attendant_id = rng.choice(num_attendants) + 1
                            bill_entries = [
                                customer_id,
                                curr_time + timedelta(minutes=50),
                                btype,
                                random.sample(
                                    ["null"] + list(range(0, 6)), 1)[0]
                            ]
                            attended_by_entries = [
                                bill_id,
                                attendant_id,
                                random.sample(
                                    ["null"] + list(range(0, 6)), 1)[0]
                            ]
                            num_dishes_ordered = rng.choice(6) + 1

                            for dish_id in random.sample(list(range(1, num_dishes + 1)), num_dishes_ordered):
                                ordered_items_entries = [
                                    bill_id,
                                    dish_id,
                                    rng.choice(5)+1,
                                    dish_prices[dish_id],
                                    random.sample(
                                        ["null"] + list(range(0, 6)), 1)[0]
                                ]
                                ord_items_writer.writerow(
                                    ordered_items_entries)

                            bill_writer.writerow(bill_entries)
                            att_by_writer.writerow(attended_by_entries)

                        elif btype == "dine-in":
                            table_id = rng.choice(num_tables) + 1
                            attendant_id = rng.choice(num_attendants) + 1

                            tbl_booking_entries = [
                                bill_id,
                                table_id,
                                curr_time,
                                (curr_time + timedelta(minutes=45))
                            ]

                            attended_by_entries = [
                                bill_id,
                                attendant_id,
                                random.sample(
                                    ["null"] + list(range(0, 6)), 1)[0]
                            ]

                            customer_id = rng.choice(num_customers) + 1
                            bill_entries = [
                                customer_id,
                                curr_time + timedelta(minutes=50),
                                btype,
                                random.sample(
                                    ["null"] + list(range(0, 6)), 1)[0]
                            ]
                            bill_writer.writerow(bill_entries)
                            tbl_booking_writer.writerow(tbl_booking_entries)

                        # elif btype == "table-booking":
                        #     pass
                        else:
                            assert(False)

                        curr_time = curr_time - timedelta(days=1)
                # writer.writerow(entries)


# def create_ingredients():


if __name__ == "__main__":
    faker = Faker()
    create_attendant_data(faker)
    create_chef_data(faker)
    create_manager_data(faker)
    create_customer_data(faker)
    create_stock_data()
    create_dish_data()
    create_table_data()
    create_ingredients_data()
    create_bill_data()
