const mongoose = require("mongoose");

const URI = process.env.MONGOSE_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database successfully connected");
  } catch (error) {
    console.log("Database connection failed", error.message);
  }
};

module.exports = connectDB;
