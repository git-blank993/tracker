import { Pool } from "pg";
import Config from "../config/config.js";

const pool = new Pool({
  connectionString: Config.getDbUrl(),
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
