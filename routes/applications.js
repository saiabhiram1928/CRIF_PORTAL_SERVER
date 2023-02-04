const express = require("express");

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
// Added getAllForIncharge route
applicationRouter.get(
    "/getAllForIncharge",
    applicationController.getAllForIncharge
);
applicationRouter.get(
    "/getResultsForStudent",
    applicationController.getResultsForStudent
);

applicationRouter.get(
    "/getResultsForSuperUsers",
    applicationController.getResultsForSuperUsers
);
applicationRouter.get(
    "/getResultsForAdmin",
    applicationController.getResultsForAdmin
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
//Added : inchargeUploadedResults route
applicationRouter.get(
    "/inchargeUploadedResults",
    applicationController.inchargeUploadedResults
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

module.exports = applicationRouter;
