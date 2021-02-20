import { Pool } from "pg";
import { DB } from "../config.keys";
// typescript safe conversion

const pool = new Pool({
  host: DB.HOST,
  user: DB.USER,
  password: DB.PASSWORD,
  port: DB.PORT,
  database: DB.DATABASE,
});

export default pool;
