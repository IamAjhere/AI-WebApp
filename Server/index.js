require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("socket.io");
require("./Database/mongodb.js");

//import routes
const users = require("./Routes/user");
const predict = require("./Routes/predicted");
const message = require("./Routes/message");
//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.BASE_URL],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
//Routes Middlewares
app.use("/api", users, predict, message);

const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log("server started in port", { port })
);

//socket io server initialization
const io = socket(server, {
  cors: {
    origin: [process.env.BASE_URL],
    credentials: true,
  },
});

//connection to socket io server
const User = require("./Models/user");
io.on("connect", (socket) => {
  socket.on("disconnect", function () {
    console.log("DISCONNESSO!!! ");
  });
  socket.on("send-msg", async (data) => {
    const token = data.user;
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id).select("name -_id");
    socket
      .to(data.to)
      .emit("msg-received", data.message, user.name, data.time, data.date);
  });
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });
});
