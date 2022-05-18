const nodemailer = require("nodemailer");

const transportador = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: `postmaster@sandboxbb0d547c4eaa4f0b97307e6cc9b344b4.mailgun.org`,
    pass: `cc73d9ace16ee1f210b1b59bfb9734c5-53ce4923-627592b0`,
  },
});

module.exports = transportador;
