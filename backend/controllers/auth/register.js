import { Router } from "express";
import Auth, { CredentialError } from "../../models/auth.js";

const router = Router();
const auth = new Auth();
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const registered = await auth.register(username, email, password);
    if (registered) {
      return res.status(200).send("User registered successfully");
    }
  } catch (err) {
    console.error(err);
    if (err instanceof CredentialError) {
      res.status(err.statusCode).send(err.message);
    }
    res.status(500).send("Error creating user");
  }
});

export default router;
