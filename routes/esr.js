const express = require("express");

const esrController = require("../controllers/esr");
const esrRouter = express.Router();

esrRouter.get("/getAllByEmail", esrController.getAllByEmail);
esrRouter.get("/getItem", esrController.getItem);

esrRouter.post("/createItem", esrController.createItem);

module.exports = esrRouter;