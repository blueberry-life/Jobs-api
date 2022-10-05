require("express-async-errors");

const express = require("express");

const app = express();

// SECTION: builtin express middleware
app.use(express.json());
// !SECTION

// SECTION: Routes

// !SECTION

module.exports = app;
