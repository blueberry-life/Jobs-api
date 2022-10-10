require("express-async-errors");

const express = require("express");

// SECTION: security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
// !SECTION

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

// SECTION: middleware
app.use(
  rateLimiter({
    // NOTE: window interval for request for per IP===15min
    windowMs: 15 * 60 * 1000,
    // NOTE: limits each IP to 100 requests per windowMS
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// !SECTION

// SECTION: Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticateUser, jobsRoutes);
app.use(routeNotFound);
app.use(errorHandlerMiddleware);
// !SECTION

module.exports = app;
