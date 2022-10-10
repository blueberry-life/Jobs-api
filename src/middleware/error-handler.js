const { StatusCodes } = require("http-status-codes");

function errorHandlerMiddleware(err, req, res, next) {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again!!",
  };
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.msg = `no item find with id:(${err.value._id})please provide another id`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `duplicated value entered for ${Object.keys(
      err.keyValue
    )} field please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res
    .status(customError.statusCode)
    .json({ success: false, data: { msg: customError.msg } });
}

module.exports = errorHandlerMiddleware;
