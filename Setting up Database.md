# Guide to Setup up mock data in MongoDB

You can also follow [this video guide](https://www.youtube.com/watch?v=fZQI7nBu32M) to set up MongoDB

1. **Download MongoDB-community server, MongoDB toolkit & MongoDB-Compass.**

   - [PostgreSQL](https://www.postgresql.org/download/)

2. **Restore database from dump files**

  Before restoring data from dump file we need to create a database in which we could dump the data

   ``` sh
    createdb -h localhost -U postgres -W caucus_db
   ```

  Dump Data to the database.

  ``` sh
   pg_restore --dbname caucus_db ./dump/caucus_db
   ```

---
