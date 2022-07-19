const jwt = require("jsonwebtoken");
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

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email Dosn't exists");
  //compare the password
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send("Invalid Password");

  //jwtwebtoken
  //create and assign a token
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token);
  res.json({
    Access_Token: token,
    email: [user.email],
  });
};

module.exports = { register, login };
