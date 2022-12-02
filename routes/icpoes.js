const express = require("express");

const icpoesController = require("../controllers/icpoes");
const icpoesRouter = express.Router();

icpoesRouter.get("/getAllByEmail", icpoesController.getAllByEmail);
icpoesRouter.get("/getItem", icpoesController.getItem);

icpoesRouter.post("/createItem", icpoesController.createItem);

module.exports = icpoesRouter;