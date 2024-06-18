const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.send("Welcome to the home page!");
  } catch (error) {
    console.log("Error: ", error);
  }
};

const registration = async (req, res) => {
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
      Message: userCreated,
      token: userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = { home, registration };