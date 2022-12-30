const express = require("express");

const multer = require("multer");
const fs = require("fs");

const applicationController = require("../controllers/applications");
const { isKeyObject } = require("util/types");
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
        const email = req.query.email;
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        const date = dd + "-" + mm + "-" + yyyy;
        const folderName = `./public/${email}/${date}`;
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        cb(null, folderName);
    },
    filename: (req, file, cb) => {
        const application_id = req.query.application_id;
        cb(null, application_id + "-" + file.originalname);
    },
});

const upload = multer({ storage }).single("file");

applicationRouter.post("/uploadPaymentSlip", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
    });
});

module.exports = applicationRouter;
