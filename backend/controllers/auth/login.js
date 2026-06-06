import { Router } from "express";
import Auth, { CredentialError, LoginServerError } from "../../models/auth.js";
import { JSONReturn } from "../../utils/index.js";

const router = Router();

const auth = new Auth();

class LoginReturn extends JSONReturn {
  data;
  /**
   * @param {string} message
   * @param {boolean} success
   * @param {Object} [data]
   * @param {number} data.id
   * @param {string} data.username
   * @param {string} data.email
   * @param {string} [error]
   */
  constructor(message, success, data, error) {
    super(message, success, error);
    this.data = data;
  }
}

const success = new LoginReturn("LogIn Successfull", true);
const failure = new LoginReturn("Error Logging In User", false);

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await auth.login(username, password);
    success.data = user;
    return res.status(200).json(success);
  } catch (err) {
    failure.error = err.message;
    console.error(err);
    if (err instanceof CredentialError) {
      return res.status(err.statusCode).json(failure);
    }
    if (err instanceof LoginServerError) {
      return res.status(err.statusCode).json(failure);
    }
    return res.status(500).json(failure);
  }
});

export default router;
