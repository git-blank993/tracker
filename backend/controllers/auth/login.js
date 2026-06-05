import { Router } from "express";
import Config from "../../config/config.js";
import { timingSafeEqual } from "node:crypto";
import pool from "../../db/init.js";

const { createHmac } = await import("node:crypto");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const getUserQuery = `SELECT * from users
                          Where username = $1`;
    const userValue = [username];

    const userData = await pool.query(getUserQuery, userValue);
    if (userData.command == "SELECT") {
      const pwd = userData.rows[0].password;
      const hashed = createHmac("sha256", Config.getSecret())
        .update(password)
        .digest("hex");

      const same = timingSafeEqual(Buffer.from(hashed), Buffer.from(pwd));
      if (same) {
        res.json({
          id: userData.rows[0].id,
          username: userData.rows[0].username,
          email: userData.rows[0].email,
        });
      } else {
        res.status(401).send("Wrong credentials");
      }
    }
  } catch (err) {
    console.error(err);
    if (!req.body.username) {
      res.status(400).send("Provide a valid username");
      return;
    }

    if (!req.body.password) {
      res.status(400).send("Provide valid password");
      return;
    }
    if (req.body.username == "" || req.body.password == "") {
      res.status(400).send("Provide a valid username and password");
      return;
    }
    res.status(500).send("Error creating user");
  }
});

export default router;
