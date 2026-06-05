import { Router } from "express";
import isValidEmail from "../../utils/index.js";
import Config from "../../config/config.js";
import pool from "../../db/init.js";

const { createHmac } = await import("node:crypto");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      res.status(400).send("Provide a valid username");
      return;
    }
    if (!email) {
      res.status(400).send("Provide valid email");
      return;
    }
    if (!password) {
      res.status(400).send("Provide valid password");
      return;
    }
    if (username == "" || email == "" || password == "") {
      res.status(400).send("Provide a valid username, email and password");
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).send("Provide a valid email");
    }

    const hashed = createHmac("sha256", Config.getSecret())
      .update(password)
      .digest("hex");

    const query = `INSERT INTO users(username, email, password) VALUES($1,$2,$3)`;
    const values = [username, email, hashed];
    const data = await pool.query(query, values);
    if (data.command == "INSERT") {
      res.send("User created successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

export default router;
