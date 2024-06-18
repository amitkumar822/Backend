const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
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

// password hasing ueing bcrypt

userSchema.pre("save", async function(next) {
  const user = this;

  if(!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(user.password, saltRound)
    user.password = hash_password;
  } catch (error) {
    console.log("Error: ", error)
  }
})

// token generate using JWT

userSchema.methods.generateToken = function () {
  try {
    // payload
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      //veriy signature
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// password compaire using bcrypt
userSchema.methods.compairePassword = function(password) {
  return bcrypt.compare(password, this.password)
}

const User = new mongoose.model("User", userSchema);

module.exports = User;
