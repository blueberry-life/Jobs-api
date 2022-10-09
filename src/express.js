require("express-async-errors");

const express = require("express");

// SECTION: Routes
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");

// !SECTION

// SECTION: middleware
const routeNotFound = require("./middleware/404");
const authenticateUser = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/error-handler");
// !SECTION

const app = express();

// SECTION: builtin express middleware
app.use(express.json());
// !SECTION

// SECTION: Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticateUser, jobsRoutes);
app.use(routeNotFound);
app.use(errorHandlerMiddleware);
// !SECTION

module.exports = app;
