const Message = require("../Models/message");
require("dotenv").config();
const axios = require("axios");
const { removeAllListeners } = require("../Models/user");

module.exports.addMessage = async (req, res, next) => {
  try {
    const from = req.user._id;
    const { to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      postedBy: from,
    });
    if (data) return res.json({ msg: "Message created successfully" });
    return res.json({ msg: "Message failed to be created successfully" });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getAllMessage = async (req, res, next) => {
  console.log("help");
  try {
    const { to } = req.body;
    const from = req.user._id;
    const messages = await Message.find({
      users: {
        $all: [to],
      },
    })
      .sort({ updatedAt: 1 })
      .populate("postedBy", "name");

    const projectMessages = messages.map((msg) => {
      let dates = new Date(msg.createdAt).toLocaleString("en-US");
      const splitsdate = dates.split(" ");
      dates = splitsdate[0].slice(0, -1);
      const times = splitsdate[1].slice(0, -3) + " " + splitsdate[2];
      return {
        fromSelf: msg.postedBy._id.toString() === from,
        message: msg.message.text,
        time: times,
        date: dates,
        user: msg.postedBy.name.toString(),
      };
    });
    res.json(projectMessages);
  } catch (ex) {
    next(ex);
  }
};
