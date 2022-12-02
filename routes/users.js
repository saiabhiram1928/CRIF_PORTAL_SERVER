const express = require("express");

const usersController = require("../controllers/users");
const usersRouter = express.Router();

usersRouter.get("/getAll", usersController.getAll);
usersRouter.get("/getItem", usersController.getItem);
usersRouter.get("/getFaculty", usersController.getFaculty);

usersRouter.post("/createItem", usersController.createItem);
usersRouter.post("/updateItem", usersController.updateItem);

module.exports = usersRouter;