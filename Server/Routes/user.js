const router = require("express").Router();

const Users = require("../Services/usersService");
//Add Users To Database
router.post("/register", async (req, res) => {
  Users.register(req, res);
});

module.exports = router;
