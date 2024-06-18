const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the auth-controller home page!");
  } catch (error) {
    console.log("Error: ", error);
  }
};

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    // hash the password
    // const hash_password = await bcrypt.hash(password, 10);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      // message: userCreated,
      message: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
    // res.send("Welcome to the auth-countroller register page!");
  } catch (error) {
    console.log("Error: ", error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const isValidUser = await bcrypt.compare(password, userExist.password);
    const isValidUser = await userExist.comparePassword(password);

    if (isValidUser) {
      res.status(200).json({
        message: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // console.log("Error: ", error);
    next(error);
  }
};

module.exports = { home, register, login };
