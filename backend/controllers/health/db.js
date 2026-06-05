import { Router } from "express";
import pool from "../../db/init.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT 1 as ping");
    res.status(200).send(data.rows[0].ping);
  } catch (err) {
    console.error("Error pinging database");
    res.status(500).send(`Error pinging database: \n${err}`);
  }
});

export default router;
