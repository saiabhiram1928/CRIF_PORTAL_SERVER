const express = require("express");

const equipmentController = require("../controllers/equipments");
const equipmentRouter = express.Router();

equipmentRouter.get("/getAll", equipmentController.getAll);
equipmentRouter.get("/checkIfIncharge", equipmentController.checkIfIncharge);
equipmentRouter.post("/updateFacultyInCharge", equipmentController.updateFacultyInCharge);

module.exports = equipmentRouter;