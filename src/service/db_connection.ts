import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

// typescript safe conversion

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(<string>process.env.DB_PORT),
  database: process.env.DB_DATABASE,
});

export default pool;
