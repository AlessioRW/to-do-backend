const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./keys/ec-priv-key.pem");

function sign(id) {
  return jsonwebtoken.sign({ id }, privateKey, { algorithm: "ES256" });
}

function verify(token) {
  if (token == null) {
    return null;
  }
  return jsonwebtoken.verify(token, privateKey, { algorithms: ["ES256"] });
}

module.exports = { sign, verify };
