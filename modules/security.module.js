// JWT Library
const jwt = require('jsonwebtoken');
const secrets = {
    "jwt": "im just standard"
}

//defaults
const _expiresIn = 3600;

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secrets.jwt, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    })
}


function generateToken(user, expiresIn) {
    let payload = generatePayload(user, new Date())
    let token = jwt.sign(payload, secrets.jwt, { expiresIn: expiresIn || _expiresIn });

    return token;
}

function generatePayload(user, createdAt) {
    return {
        email: user.email,
        password: user.password,
        role: user.role,
        createdAt: createdAt || user.createdAt
    }
}


module.exports.setSecret = (secret) => {
    secrets.jwt = secret;
}

module.exports.secrets = secrets;
module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;