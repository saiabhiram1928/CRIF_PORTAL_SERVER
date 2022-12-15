const express = require("express");

const multer = require("multer");

const applicationController = require("../controllers/applications");
const applicationRouter = express.Router();

applicationRouter.get("/getAllByEmail", applicationController.getAllByEmail);
applicationRouter.get(
    "/getAllByEmailWithInstrument",
    applicationController.getAllByEmailWithInstrument
);
applicationRouter.get(
    "/getAllByEmailForDashboard",
    applicationController.getAllByEmailForDashboard
);
applicationRouter.get(
    "/getAllForFaculty",
    applicationController.getAllForFaculty
);
applicationRouter.get("/getAllForAdmin", applicationController.getAllForAdmin);
applicationRouter.get("/getItem", applicationController.getItem);
applicationRouter.get(
    "/rejectApplication",
    applicationController.rejectApplication
);
applicationRouter.get(
    "/facultyApproveApplication",
    applicationController.facultyApproveApplication
);
applicationRouter.get(
    "/inchargeApproveApplication",
    applicationController.inchargeApproveApplication
);
applicationRouter.get(
    "/adminApproveApplication",
    applicationController.adminApproveApplication
);

applicationRouter.post("/createItem", applicationController.createItem);

// TEMP CODE TO UPLOAD AND RETERIVE PAYMENT SLIPS AT BACKEND
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        console.log(file);
        cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
    },
});
const upload = multer({
    storage: storage,
});
applicationRouter.post(
    "/uploadPaymentSlip",
    upload.single("paymentSlip"),
    applicationController.uploadPaymentSlip
);

module.exports = applicationRouter;
