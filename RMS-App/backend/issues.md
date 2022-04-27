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
