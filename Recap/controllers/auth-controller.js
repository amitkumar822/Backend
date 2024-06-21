const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const registration = async (req, res, next) => {
  try {
    const { username, password, phone, email } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.json({ message: "email is already defined" });
    }
    // const hash_password = await bcrypt.hash(password, 10)
    const userCreated = await User.create({ username, password, phone, email });

    res.json({
      message: "Register successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // console.error(error);
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.json({ messsage: "email is not defined" });
    }
    const isValidUser = await userExist.compairePassword(password)

    if (isValidUser) {
      res.json({
        message: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.json({ message: "email or password wrong" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registration, login };
