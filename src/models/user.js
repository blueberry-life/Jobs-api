const mongoose = require("mongoose");

const {
  jwtTokenCreator,
  passwordEncrypt,
  checkUserPassword,
} = require("../authentication/user");

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

userSchema.pre("save", passwordEncrypt);
userSchema.methods.createJwt = jwtTokenCreator;
userSchema.methods.comparePassword = checkUserPassword;

module.exports = mongoose.model("User", userSchema);
