const router = require("express").Router();
const message = require("../Services/messageService");
const verify = require("../Services/auth");

router.post("/message", verify, message.addMessage);

router.post("/allmessage", verify, message.getAllMessage);

router.post("/messagehistory", verify, message.messageHistory);
module.exports = router;
