# Guide to Setup up mock data in PostgreSQL

You can also follow [this video guide](https://www.youtube.com/watch?v=fZQI7nBu32M) to set up PostgreSQL

1. **Download PostgreSQL and pg-admin4(optional).**
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
