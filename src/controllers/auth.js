const { StatusCodes } = require("http-status-codes");

async function register(req, res, next) {
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "you are registered" } });
}
async function login(req, res, next) {
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "you are logged in" } });
}

module.exports = { register, login };
