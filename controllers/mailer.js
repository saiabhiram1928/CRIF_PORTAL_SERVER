var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { promises: fsPromise } = require("fs");

// Add attachments in mail #
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
//send attachement of 
const sendResultsToMail = async (req, res, next) => {
  try {
    const dmail = req.query.email;
    const application_id = req.query.application_id;
    const directory = `./public/${dmail}/${application_id}/Results`;
    let filePath = "";    
    let file="";
    const email="benimaru1928@gmail.com"
    const subject = req.query.subject;
    const message = req.query.message;
    if (!fs.existsSync(directory)) {
      res.status(404).json({ message: "File not found" });
  }else{
    try {
      // Finding first file in `directory`
     
      console.log("directory:", directory);
      const files = await fsPromise.readdir(directory);
      if (files.length > 0) {
          file = files[0];
          filePath = path.join(directory, file);
          console.log(filePath);
      } else {
          console.log("Directory is empty");
      }
      
  } catch (err) {
      console.error(err);
  }
  }


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
      attachments : [
        {filename : file ,path : filePath}
      ]   
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
exports.sendResultsToMail=sendResultsToMail
