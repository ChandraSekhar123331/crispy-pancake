- Are we representing addresses the right way? Or should we just maintain a list of addresses in a seperate table and just reference that table(Foreign Key basically)

- Should we store role in employee table? I think it would be redundant.
- In case we are adding it we need to fix some notation all lowercase versions of manager, chef, attendant maybe. First of all why did we not create seperate tables for all manager, chef, attendant... Think.

- At the backend we are checking if the email is repetitive or if the username is repetitive. Our backend would return an error in such a case. But is there a better way to do this. i.e. telling the user that the particular username is unavailable etc. etc even before he submits the form. Maybe not. Doing this for email is against privacy ig. For username it might be okay.

- We are storing billid in table-booking table. Is this good? User generally will book the table first and later will eat and then pay the bill..

- Need to take decision if we have to implement the delete of employees in the Employee table and cascade? or what? Should we implement delete at all? We need to ig because we had the use case of fire an employee

- This leads to deleting orders whose attendant is being deleted? What to do in such a case? Can we escape?

- On delete he should be logged out also... Their sessions are to be cleared.. What not.. Think this is going to be a big mess.

- Right Now the delete entry is not even present in the employee table. So for now no allowance to deletes on employees. Need to add this later.

- Check if /employee routes are working well. Because we already have the routes = /employee/chef etc.

- Tables

  - create table
  - update table stats
  - delete a table
  - GetFree Tables doable
  - Book table a bit difficult ig.. Need to understand the bill_id column present.

- We need to store prices along with ordered_items. Otherwise things will go wrong if the price is updated for dishes or stock.

- Need to add >0 constraints in the database. For stock and others also. Otherwise any minReqd would get inserted.

- delete and update on stock items is not yet implemented. Rest-3 (getOneInfo, getAllInfo, create/insert)

- delete and update on dish is not yet done. Need to add get_ingredients and get_cost for dishes. Ig get_cost can be merged with getOneInfo and getAllInfo functions itself as it is just an aggregate function

- quantity < 0 constraints are not being enforced in the backend. They should be enforced in the front-end and also in database level. There should be some cue to the front-end person that these things should not go <= 0.

- Please note the semantics of ingredients.getAllInfo and ingredients.getOneInfo

- Should we also have an endpoint that takes in a list of ingredients for **one-dish** and add all together?. Right now we can only add one (dish_id, stock_id, quantity) in one go.

- delete and update on ingredients is also not done.

- // need to check if the email is already present;
  // need to check if the username is already used; in manager controller.insert. Either should do it in direct schema now.. or should do it backend using other services... Look into this.

- basic Menu done. Sorts based on dish_price DESC. Maybe we can add few other menus based on sorting etc etc. But time.. not there

- Need to add role checks everywhere. RightNow not added at any place. Especially in billOnline function.

- Change the delivery types in the bill table order_type column. they should be online, telephone, hotel. You should change the underlying generate data accordingly.

- There will be issues with dishes with no ingredients. Just restrict it somehow. Otherwise its a headache with queries.

- ~~Make sure that the delivered column in attended_by is never null. Otherwise we will have issues.~~

- ~~Added fireEmployee. But need to take care such that a fired employee is not displayed, not allowed to login, not allowed to be an attendant etc.~~

- the timestamp for getFreeTables should be the same form as stored in the database. No timezone etc.
