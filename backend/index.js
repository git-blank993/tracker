import express from "express";
import Config from "./config/config.js";
import healthRouter from "./controllers/health/index.js";
import authRouter from "./controllers/auth/index.js";
import { JSONReturn } from "./utils/index.js";
const app = express();
const config = Config;
const port = config.getPort();

app.use((req, _res) => {
  console.log(`${req.method} -> ${req.url}`);
});
app.use(express.json());
app.use("/health", healthRouter);
app.use("/auth", authRouter);

const stats = new JSONReturn("Tracker API live", true);

app.get("/", (_req, res) => {
  res.json(stats);
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
