import { boardService } from "../services/boardService";

//calls the get all board service function and sends a response
export const getAllBoardsController = async (req, res) => {
  try {
    const gotAllBoards = await boardService.getAllBoards();
    res.status(200).json({
      status: "success",
      boards: gotAllBoards.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the post Board service function and sends a response
export const postBoardController = async (req, res) => {
  try {
    const postedBoard = await boardService.postBoard(req);
    res.status(201).json({
      status: "success",
      boards: postedBoard.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the delete Board service function and sends a response
export const deleteBoardController = async (req, res) => {
  try {
    const deletedBoard = await boardService.deleteBoard(req);
    res.status(200).json({
      status: "success",
      boards: deletedBoard.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the update Board service function and sends a response
export const updateBoardController = async (req, res) => {
  try {
    const updatedBoard = await boardService.updateBoard(req);
    res.status(200).json({
      status: "success",
      boards: updatedBoard.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};
