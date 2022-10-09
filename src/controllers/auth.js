const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

async function register(req, res, next) {
  const { name, email, password } = req.body;

  // SECTION: this code get normal string password from user and encrypt it and returns hashed password
  // NOTE: higher genSalt number means password is more secure but it's take more process
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // !SECTION
  const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...tempUser });

  return res.status(StatusCodes.CREATED).json({
    success: true,
    data: { msg: "you are registered", user },
  });
}

async function login(req, res, next) {
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "you are logged in" } });
}

module.exports = { register, login };
