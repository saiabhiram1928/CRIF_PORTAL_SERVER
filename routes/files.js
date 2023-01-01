const express = require("express");

const filesControler = require("../controllers/files");
const filesRouter = express.Router();

filesRouter.post("/uploadPaymentSlip", filesControler.uploadPaymentSlip);
filesRouter.post(
    "/getPaymentSlipsByEmail",
    filesControler.getPaymentSlipsUploadByEmail
);
module.exports = filesRouter;
