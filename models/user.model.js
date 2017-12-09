const Model = require('mongo-leaf').Model;
let User = new Model("User", {}, { collection: "users" });

module.exports.User = User;
module.exports.replaceUser = replaceUser;


function replaceUser(newModel) {
    User = newModel;
}