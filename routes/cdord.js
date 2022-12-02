const express = require("express");

const cdordController = require("../controllers/cdord");
const cdordRouter = express.Router();

cdordRouter.get("/getAllByEmail", cdordController.getAllByEmail);
cdordRouter.get("/getItem", cdordController.getItem);

cdordRouter.post("/createItem", cdordController.createItem);

module.exports = cdordRouter;