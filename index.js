module.exports.auth = require("./modules/auth.module.js");
module.exports.User = require("./models/user.model.js").User;
module.exports.replaceUser = require("./models/user.model.js").replaceUser;
module.exports.verifyToken = require("./modules/security.module.js").verifyToken;
module.exports.setSecret = require("./modules/security.module.js").setSecret;