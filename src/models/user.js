const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "please provide email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
});

// SECTION: this code get normal string password from user and encrypt it and returns hashed password
userSchema.pre("save", async function () {
  // NOTE: higher genSalt number means password is more secure but it's take more process
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// !SECTION

module.exports = mongoose.model("User", userSchema);
