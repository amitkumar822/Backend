const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.send("Welcome to the home page!");
  } catch (error) {
    console.log("Error: ", error);
  }
};

const registration = async (req, res, next) => {
  try {
    const { username, password, email, phone } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.json({ message: "Email alredy existe" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = await User.create({
      username,
      password,
      email,
      phone,
    });

    res.json({
      Message: "Registration successfully completed",
      token: userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log("Error: ", error);
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.json({ message: "Invalid credentails" });
    }

    const isValidUser = await userExist.compairPassword(password);

    if (isValidUser) {
      res.json({
        message: "Login successful",
        token: userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.json({ message: "email or password wrong" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, registration, login };
