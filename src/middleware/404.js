const { StatusCodes } = require("http-status-codes");

function routeNotFound(req, res, next) {
  res
    .status(StatusCodes.BAD_REQUEST)
    .json({ success: false, data: { msg: "route does not exist" } });
}

module.exports = routeNotFound;
