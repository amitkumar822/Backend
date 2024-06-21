const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

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

// password hash
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) {
      next();
    }

    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);

    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// password compaire
userSchema.methods.compairePassword = async function(password) {
  return bcrypt.compare(password, this.password)
}

// token generation
userSchema.methods.generateToken = async function() {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10d",
      }
    )
  } catch (error) {
    
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
