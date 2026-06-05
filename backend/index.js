import express from "express";
import Config from "./config/config.js";
import healthRouter from "./controllers/health/index.js";
import authRouter from "./controllers/auth/index.js";
const app = express();
const config = Config;
const port = config.getPort();

app.use(express.json());
app.use("/health", healthRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
