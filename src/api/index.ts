import express from "express";

const { APP_PORT } = process.env;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json("API running...");
});

app.listen(APP_PORT, () => console.log(`API running on port ${APP_PORT}...`));
