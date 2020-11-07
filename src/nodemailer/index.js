const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shopdharan@gmail.com",
    pass: "shresthasamir",
  },
});

function sendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = {
   
  sendMailText: (from, to=[], subject, text ) => {
    const mailOptions = {
      from,
      to: to.toString(),
      subject,
      text,
    };
    return sendMail(mailOptions);
  },
  sendMailHTML: (from, to=[], subject, html) => {
    const mailOptions = {
      from,
      to: to.toString(),
      subject,
      html,
    };
    return sendMail(mailOptions);
  },
};
