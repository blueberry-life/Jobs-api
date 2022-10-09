const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");

async function register(req, res, next) {
  const user = await User.create({ ...req.body });

  return res.status(StatusCodes.CREATED).json({
    success: true,
    data: {
      msg: "you are registered",
      user: { name: user.name, email: user.email },
    },
  });
}

async function login(req, res, next) {
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "you are logged in" } });
}

module.exports = { register, login };
