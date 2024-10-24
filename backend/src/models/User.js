const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    emails: { type: String, required: false}
  },
  {
    timestamps: true,
  }
);

// Static method for signup, ATM A USER CAN ONLY BE ADDED VIA API (postman for example)
userSchema.statics.signup = async function (
  username,
  password,
) {
  const userExists = await this.findOne({ username });
  if (userExists) throw new Error("User already exists");

  // Password validator
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hashedPassword,
    emails,
  });
  return user;
};

// Static method for login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  return user;
};


module.exports = mongoose.model("User", userSchema);
