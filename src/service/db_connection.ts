import { DATABASE_URL, PROD } from "../config.keys";
import Knex from "knex";

const client = Knex({
  client: "pg",
  connection: {
    connectionString: DATABASE_URL,
    ssl: PROD,
  },
  searchPath: ["knex", "public"],
});

export default client;
