const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

function validPassword(password, hash, salt) {
  let hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

function genPassword(password) {
  let salt = crypto.randomBytes(32).toString("hex");
  let genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function issueJWT(user) {
  const id = user.id;

  const expiresIn = "1d";

  const payload = {
    sub: id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    iat: Date.now(),
  };

  console.log(payload);
  console.log("Utils.js/issueJWT");

  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
