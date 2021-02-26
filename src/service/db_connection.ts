import { DATABASE_URL } from "../config.keys";
import Knex from "knex";

const client = Knex({
  client: "pg",
  connection: DATABASE_URL,
  searchPath: ["knex", "public"],
});

export default client;
