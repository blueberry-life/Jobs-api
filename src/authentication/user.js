const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SECTION: this code get normal string password from user and encrypt it and returns hashed password
function jwtTokenCreator() {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
}
// !SECTION

async function passwordEncrypt() {
  // NOTE: higher genSalt number means password is more secure but it's take more process
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
}

async function checkUserPassword(userInput) {
  const dbPass = this.password;
  const isMatch = await bcrypt.compare(userInput, dbPass);
  return isMatch;
}

module.exports = {
  jwtTokenCreator,
  passwordEncrypt,
  checkUserPassword,
};
