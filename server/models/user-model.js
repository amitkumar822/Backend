const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// secure or hash the password with bycript

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// password compaire
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// json web token
userSchema.methods.generateToken = function () {
  try {
    // PAYLOAD
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      // VERIFY SIGNATURE
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
