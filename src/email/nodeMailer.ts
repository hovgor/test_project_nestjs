const nodeMailer = require("nodemailer");
// const cron = require("node-cron");
//
function mailer(toMail) {
  const mail = {
    from: "elseteams01@gmail.com",
    to: toMail,
    subject: "Else teams verify",
    text: "sssss!!!!!",
    html: "<a href='http://localhost:3000/create-password'>Go to the next page click here</a>",
  };

  const smtpTransport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "elseteams01@gmail.com",
      pass: "else1234",
    },
  });

  smtpTransport.sendMail(mail, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + info.response);
    }

    //smtpTransport.close();
  });
}
let email = 'gor95hov@gmail.com';
mailer(email);
module.exports = mailer;