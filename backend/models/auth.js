import Config from "../config/config.js";
import pool from "../db/init.js";
import { createHmac, timingSafeEqual } from "node:crypto";
import isValidEmail from "../utils/index.js";

export class CredentialError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = "CredentialError";
    this.statusCode = 400;
  }
}

export class LoginServerError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = "LoginServerError";
    this.statusCode = 400;
  }
}

class Auth {
  /**
   * Login method of the Auth object
   *
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    if (!username || !password) {
      throw new CredentialError("Username or Password is not provided.");
    }
    try {
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
          return {
            id: userData.rows[0].id,
            username: userData.rows[0].username,
            email: userData.rows[0].email,
          };
        } else {
          throw new CredentialError("Wrong Credentials");
        }
      }
    } catch (err) {
      console.error("Error Signing In User :\n", err);
      throw new LoginServerError(err.message);
    }
  }
  /**
   * Register method of the Auth object
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  async register(username, email, password) {
    if (!username || !email || !password) {
      throw new CredentialError("Provide username, email and password");
    }
    try {
      if (!username) {
        throw new CredentialError("Provide a valid username");
      }
      if (!email) {
        throw new CredentialError("Provide valid email");
      }
      if (!password) {
        throw new CredentialError("Provide valid password");
      }
      if (username == "" || email == "" || password == "") {
        throw new CredentialError(
          "Provide a valid username, email and password",
        );
      }
      if (!isValidEmail(email)) {
        throw new CredentialError("Provide a valid email");
      }

      const hashed = createHmac("sha256", Config.getSecret())
        .update(password)
        .digest("hex");

      const query = `INSERT INTO users(username, email, password) VALUES($1,$2,$3)`;
      const values = [username, email, hashed];
      const data = await pool.query(query, values);
      if (data.command == "INSERT") {
        return true;
      }
    } catch (err) {
      console.error("Error creating user: \n", err);
      return err;
    }
  }
}

export default Auth;
