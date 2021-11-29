const express = require("express");
const usersController = require("../controllers/userController");

const usersRouter = express.Router();

//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.

usersRouter.get("/:user_id", usersController.getUserController);

usersRouter.get("/", usersController.getAllUsersController);

usersRouter.post("/", usersController.postUserController);

usersRouter.delete("/:user_id", usersController.deleteUserController);

usersRouter.put("/:user_id", usersController.updateUserController);

module.exports = usersRouter;
