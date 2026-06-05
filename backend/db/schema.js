import pool from "./init.js";

const userRes = await pool.query(`CREATE TABLE IF NOT EXISTS users (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username varchar(225),
  email varchar(225),
  password text
);`);

if (userRes.command == "CREATE") {
  console.debug("CREATED USER TABLE SUCCESSFULLY");
}
