var assert = require('assert');
let auth = require("../index.js").auth;
let User = require("../index.js").User;
describe('Unit Test Start!', function () {
    let token = "";
    let user = {};
    it('Should register user in DB', async function () {
        await require("mongo-leaf").connect("mongodb://127.0.0.1:27017/mongo-leaf-auth")
        await User.remove({})
        let d = await auth.register({
            email: "heiyukidev@gmail.com",
            password: "123456"
        })
        user = d.ops[0];
        assert.equal(user.email, "heiyukidev@gmail.com");
        return;
    });
    it('Should login user in DB', async function () {
        await require("mongo-leaf").connect("mongodb://127.0.0.1:27017/mongo-leaf-auth")
        let d = await auth.login(
            "heiyukidev@gmail.com",
            "123456"
        )
        assert.equal(d.user.email, "heiyukidev@gmail.com");
        token = d.token;
        return;
    });
    it('Should get user from token', async function () {
        await require("mongo-leaf").connect("mongodb://127.0.0.1:27017/mongo-leaf-auth")
        let tokenUser = await auth.getUserFromToken(token)
        assert.equal(tokenUser.email, "heiyukidev@gmail.com");
        return;
    });
    it('Should refresh the token', async function () {
        await require("mongo-leaf").connect("mongodb://127.0.0.1:27017/mongo-leaf-auth")
        let tokenUser = await auth.refreshToken(token)
        if (tokenUser) {
            return;
        } else {
            assert.fail()
        }
    });
    it('Should Update the user', async function () {
        await require("mongo-leaf").connect("mongodb://127.0.0.1:27017/mongo-leaf-auth")
        user.first_name = "hei";
        user.last_name = "yuki";
        await auth.updateUser(user._id, user)
        let fuser = await auth.login('heiyukidev@gmail.com', '123456');
        if (fuser && Object.keys(fuser).length === 2) {
            return;
        } else {
            assert.fail()
        }
    });
    it('Should Update the password', async function () {
        await require("mongo-leaf").connect("mongodb://127.0.0.1:27017/mongo-leaf-auth")
        await auth.updatePassword(user._id, '654321')
        let fuser = await auth.login('heiyukidev@gmail.com', '654321');
        if (fuser && Object.keys(fuser).length === 2) {
            return;
        } else {
            assert.fail()
        }
    });
});