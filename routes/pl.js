const express = require("express");

const plController = require("../controllers/pl");
const plRouter = express.Router();

plRouter.get("/getAllByEmail", plController.getAllByEmail);
plRouter.get("/getItem", plController.getItem);

plRouter.post("/createItem", plController.createItem);

module.exports = plRouter;