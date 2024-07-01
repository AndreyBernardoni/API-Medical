const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already registered"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"],
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.bcrypt.hash(this.password, 10);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    console.log("auth password", password);
    console.log("auth user.password", user.password);

    if (auth) {
      return user;
    }

    throw Error("Incorrect password");
  }

  throw Error("Incorrect email");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
