const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("../errors/custom-error");

function errorHandlerMiddleware(err, req, res, next) {
  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, data: { msg: err } });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, data: { err } });
}

module.exports = errorHandlerMiddleware;
