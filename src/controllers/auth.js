const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");
const { BadRequest, Unauthenticated } = require("../errors");

async function register(req, res, next) {
  const user = await User.create({ ...req.body });
  const token = user.createJwt();
  return res.status(StatusCodes.CREATED).json({
    success: true,
    data: {
      msg: "you are registered!!",
      user: { name: user.name, email: user.email },
      token,
    },
  });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthenticated("Invalid email or password");
  }

  isPasswordIsCorrect = await user.comparePassword(password);
  if (!isPasswordIsCorrect) {
    throw new Unauthenticated("Invalid email or password");
  }

  const token = user.createJwt();
  return res.status(StatusCodes.OK).json({
    success: true,
    data: {
      msg: "you are logged in!!",
      user: { name: user.name, email: user.email },
      token,
    },
  });
}

module.exports = { register, login };
