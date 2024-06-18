// const mongoose = require("mongoose");

// // const URI = "mongodb://localhost:27017/RecapMERN";
// const URI = process.env.MONGOSE_URI;

// const connectDB = async () => {
//   try {
//     await mongoose.connect(URI);
//     console.log("Connected to MongoDB successfully");
//   } catch (error) {
//     console.log("Database connection failed");
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const URI = process.env.MONGOSE_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.log("Database connection failed", error)
    }
}

module.exports = connectDB;