- Are we representing addresses the right way? Or should we just maintain a list of addresses in a seperate table and just reference that table(Foreign Key basically)

- Should we store role in employee table? I think it would be redundant.
- In case we are adding it we need to fix some notation all lowercase versions of manager, chef, attendant maybe. First of all why did we not create seperate tables for all manager, chef, attendant... Think.

- At the backend we are checking if the email is repetitive or if the username is repetitive. Our backend would return an error in such a case. But is there a better way to do this. i.e. telling the user that the particular username is unavailable etc. etc even before he submits the form. Maybe not. Doing this for email is against privacy ig. For username it might be okay.

- We are storing billid in table-booking table. Is this good? User generally will book the table first and later will eat and then pay the bill..

- Tables

  - create table
  - update table stats
  - delete a table
  - GetFree Tables doable
  - Book table a bit difficult ig.. Need to understand the bill_id column present.
