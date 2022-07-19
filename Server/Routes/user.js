const router = require("express").Router();

const User = require("../Services/usersService");
//Add Users To Database
router.post("/register", async (req, res) => {
  User.register(req, res);
});

//Login Users
router.post("/login", async (req, res) => {
  User.login(req, res);
});

module.exports = router;
