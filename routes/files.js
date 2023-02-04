const express = require("express");

const filesControler = require("../controllers/files");
const filesRouter = express.Router();

filesRouter.post("/uploadPaymentSlip", filesControler.uploadFiles);
filesRouter.post("/uploadResults", filesControler.uploadFiles);
filesRouter.post(
    "/getPaymentSlipsByEmail",
    filesControler.getPaymentSlipsUploadByEmail
);
filesRouter.post("/PaymentSlipdownload", filesControler.downloadPaymentSlip);
filesRouter.post("/getFilePath", filesControler.getFilePath);

module.exports = filesRouter;
