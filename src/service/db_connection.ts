import { DATABASE_URL } from "../config.keys";
import Knex from "knex";

const client = Knex({
  client: "pg",
  connection: {
    connectionString: DATABASE_URL,
    ssl: true,
  },
  searchPath: ["knex", "public"],
});

export default client;
