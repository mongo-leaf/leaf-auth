// JWT Library
const jwt = require('jsonwebtoken');
// Data Validator
const validate = require('hyvalidator').validate;
const Strings = require('hyvalidator').Strings;
// Crypting Library
const bcrypt = require('bcryptjs');
// Secret from config file
const secrets = require("./security.module.js").secrets;

const moment = require('moment');
//User Collection
const User = require('../models/user.model.js').User;

module.exports.login = login;
module.exports.register = register;
module.exports.getUserFromToken = getUserFromToken;
module.exports.refreshToken = refreshToken;


//defaults
const _expiresIn = 3600;


async function login(email, password) {
    let data = await User.find({ email: email });
    if (data !== null && data.length && data.length > 0) {
        if (bcrypt.compareSync(password, data[0].password)) {
            let user = data[0];
            let token = generateToken(user, 3600);
            return { user, token };
        } else {
            throw ("Wrong Password");
        }
    } else {
        throw "User Not Found";
    }
}

async function register(user) {
    var rules = new Strings.Rule;
    rules.setIsEmail();
    var errors = validate(user.email, rules);
    if (errors) {
        throw (errors);
    }
    else {
        let data = await User.find({ email: user.email })
        if (data && data.length && data.length > 0) {
            throw ("This Email Is Already Taken");
        } else {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(user.password, salt);
            user.password = hash;
            user.salt = salt;
            let fuser = await User.insertOne(user);
            return fuser;
        }
    }
}

async function getUserFromToken(token) {
    let decoded = jwt.decode(token);
    if (decoded && decoded !== null) {
        let data = await User.find({ email: decoded.email })
        if (data[0]) {
            return data[0];
        } else {
            return {};
        }
    } else {
        throw "Invalid Token";
    }
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

function refreshToken(token) {
    try {
        let decoded = jwt.decode(token);
        if (moment(decoded.createdAt).add(1, "day") > moment()) {
            return generateToken(decoded, 3600);
        } else {
            return "Token expired";
        }
    } catch (e) {
        return "Invalid token";
    }
}


