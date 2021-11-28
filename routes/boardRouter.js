const express = require("express");
const boardController = require("../controllers/boardController");
export const boardRouter = express.Router();

//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.

boardRouter.get("/", boardController.getBoardsController);

boardRouter.post("/", boardController.postBoardController);

boardRouter.delete(":board_id", boardController.deleteBoardController);

boardRouter.put("/:board_id", boardController.updateBoardController);
