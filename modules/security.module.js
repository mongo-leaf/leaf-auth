// JWT Library
const jwt = require('jsonwebtoken');
const secrets = {
    "jwt": "im just standard"
}

module.exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secrets.jwt, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    })
}


module.exports.setSecret = (secret) => {
    secrets.jwt = secret;
}

module.exports.secrets = secrets;