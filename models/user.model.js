const Model = require('mongo-leaf').Model;
let User = new Model("_User", {}, { collection: "users" });

module.exports.User = User;
module.exports.replaceUser = replaceUser;


function replaceUser(newModel) {
    User = newModel;
}