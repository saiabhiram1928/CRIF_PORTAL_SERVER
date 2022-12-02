var nodemailer = require("nodemailer");

const sendMail = async (req, res, next) => {
  try {
    const email = req.query.email;
    const subject = req.query.subject;
    const message = req.query.message;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "webservices_crif@nitw.ac.in",
        pass: "crifweb123",
      },
    });
    var mailOptions = {
      from: "webservices_crif@nitw.ac.in",
      to: email,
      subject: subject,
      text: message,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        if (!res.headersSent) {
          res.status(404).json(err);
        }
      } else {
        console.log("Email sent: " + info.response);
        if (!res.headersSent) {
          res.status(200).json(rows);
        }
      }
    });
    if (!res.headersSent) {
      res.status(200).json(rows);
    }
  } catch (err) {
    if (!res.headersSent) {
      res.status(200).json(err);
    }
  }
};

exports.sendMail = sendMail;
