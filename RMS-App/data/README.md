- The sql for session table is directly taken from the node_modules/connect-pg-simple/table.sql

- First create a folder called data_folder/

- Then run `python create_data.py`

- Then run `python insertdata.py --name [DB_NAME] --user [USER] --passwd [PASSWORD] --host localhost --port 5432 --ddl DDL.sql`
