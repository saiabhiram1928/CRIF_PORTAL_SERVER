const express = require("express");

const mailerController = require("../controllers/mailer");
const mailerRouter = express.Router();

mailerRouter.get("/sendMail", mailerController.sendMail);

module.exports = mailerRouter;