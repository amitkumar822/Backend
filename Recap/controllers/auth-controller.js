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
    // console.log(req.body)
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
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const userExist = await User.findOne({ email });
    if(!userExist) {
      return res.status(400).json({ message: "nvatid Credentials" });
    }
    
    const user = await userExist.compairePassword(password)

    if(user) {
      res.json({message: "Login successful"})
    }else{
      res.status(400).json({ message: "email or password wrong" });
    }

  } catch (error) {
    console.log("Error Login: " + error)
  }
}

module.exports = { home, registration, login };
