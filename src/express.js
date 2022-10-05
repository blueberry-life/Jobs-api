require("express-async-errors");

const express = require("express");

const routeNotFound = require("./middleware/404");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

// SECTION: builtin express middleware
app.use(express.json());
// !SECTION

// SECTION: Routes

app.use(routeNotFound);
app.use(errorHandlerMiddleware);
// !SECTION

module.exports = app;
