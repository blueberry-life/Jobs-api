require("dotenv").config();

const http = require("http");

const connectDb = require("./db/connect");
const expressApp = require("./express");

// SECTION: this variables imported from .env file
const port = process.env.PORT || 3100;
const dbUrl = process.env.dbUrl;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
// !SECTION

const server = http.createServer(expressApp);

async function startServer() {
  try {
    await connectDb(dbUrl, username, password);
    server.listen(port, () =>
      console.log(`connected to db and server running on port:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
}

startServer();
