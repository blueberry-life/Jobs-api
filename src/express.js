require("express-async-errors");

const express = require("express");

const routeNotFound = require("./middleware/404");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");

const app = express();

// SECTION: builtin express middleware
app.use(express.json());
// !SECTION

// SECTION: Routes
app.use("/api/v1/jobs", jobsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use(routeNotFound);
app.use(errorHandlerMiddleware);
// !SECTION

module.exports = app;
