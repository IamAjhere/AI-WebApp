require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.DB;
mongoose.connect(uri);
