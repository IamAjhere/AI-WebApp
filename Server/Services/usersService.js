require("dotenv").config;
const User = require("../Models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new User
  const user = new User({
    name: req.body.name,
    dateofbirth: req.body.dateofbirth,
    email: req.body.email,
    password: hashPassword,
  });
  console.log(user);
  await user.save((error) => {
    if (error) {
      res.status(400).send("something went wrong" + error.message);
    } else {
      res.status(200).send("success");
    }
  });
};

module.exports = { register };
