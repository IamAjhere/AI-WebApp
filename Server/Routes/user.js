const router = require("express").Router();
const verify = require("../Services/auth");
const User = require("../Services/usersService");
//Add Users To Database
router.post("/register", User.register);

//Login Users
router.post("/login", User.login);

router.post("/updateuser", verify, User.updateProfile);

router.get("/userinfo", verify, User.userInfo);
module.exports = router;
