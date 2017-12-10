// JWT Library
const jwt = require('jsonwebtoken');
const secrets = {
    "jwt": "im just standard"
}

module.exports.verifyToken = async (token) => {
    jwt.verify(token, secrets, (err, decoded) => {
        if (err) {
            throw err;
        }
        return decoded;
    });
}

module.exports.setSecret = (secret) => {
    secrets.jwt = secret;
}

module.exports.secrets = secrets;