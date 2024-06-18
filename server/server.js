require('dotenv').config();
const express = require("express");
const app = express();

// Mount the Router: To use the router in your main Express app, you can "mount " it at a specific URL prefix
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json());
app.use("/api/auth", router);

app.use(errorMiddleware)

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
