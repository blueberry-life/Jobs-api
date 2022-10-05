const BadRequest = require("./bad-request");
const Unauthenticated = require("./unauthenticated");
const CustomApiError = require("./custom-error");
const NotFound = require("./not-found");

module.exports = { BadRequest, Unauthenticated, CustomApiError, NotFound };
