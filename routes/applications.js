const express = require("express");

const applicationController = require("../controllers/applications");
const applicationRouter = express.Router();

applicationRouter.get("/getAllByEmail", applicationController.getAllByEmail);
applicationRouter.get("/getAllByEmailWithInstrument", applicationController.getAllByEmailWithInstrument);
applicationRouter.get("/getAllByEmailForDashboard", applicationController.getAllByEmailForDashboard);
applicationRouter.get("/getAllForFaculty", applicationController.getAllForFaculty);
applicationRouter.get("/getAllForAdmin", applicationController.getAllForAdmin);
applicationRouter.get("/getItem", applicationController.getItem);
applicationRouter.get("/rejectApplication", applicationController.rejectApplication);
applicationRouter.get("/facultyApproveApplication", applicationController.facultyApproveApplication);
applicationRouter.get("/inchargeApproveApplication", applicationController.inchargeApproveApplication);
applicationRouter.get("/adminApproveApplication", applicationController.adminApproveApplication);


applicationRouter.post("/createItem", applicationController.createItem);

module.exports = applicationRouter;