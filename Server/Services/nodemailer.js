const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, text) => {
  try {
    // create  SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      auth: {
        user: process.env.USERR,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USERR,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
