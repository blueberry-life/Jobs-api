const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom-error");

class NotFound extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
