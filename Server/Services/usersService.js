const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const sendEmail = require("./nodemailer");
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
  await user.save();
  sendEmail(
    req.body.email,
    "Created New Account",
    "Your Account Created Sucessfully: \n" + "Login Email: " + user.email
  );
  res.send("Sucessfully Added Account");
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
const updateProfile = async (req, res, next) => {
  try {
    const id = req.user._id;

    const updates = {
      image: req.body?.image,
      name: req.body?.name,
      email: req.body?.email,
      dateofbirth: req.body?.birthday,
      mobile: req.body?.mobile,
    };
    await User.updateOne({ _id: id }, updates).then((r, err) => {
      if (err) {
        res.send(err);
      }
      res.send(r);
    });
  } catch (err) {
    next(err);
  }
};

const userInfo = async (req, res, next) => {
  try {
    await User.findOne({ _id: req.user._id }).then((r) => {
      res.send(r);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, updateProfile, userInfo };
