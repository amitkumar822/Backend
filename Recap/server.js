require('dotenv').config();
const express = require("express");

const app = express();
const router = require("./routers/auth-router");
const connectDB = require("./utils/auth-db");

app.use(express.json());

app.use("/api/auth", router);

app.get("/", (req, res) => {
  res.send("Welcome to HomePage!");
});

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
