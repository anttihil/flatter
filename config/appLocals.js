import { selectBoards } from "../services/boardService.js";
import db from "./db.js";

export async function boardAppLocals(app) {
  try {
    const boards = await selectBoards();
    console.log("Init boards:" + boards);
    app.locals = boards;
  } catch (error) {
    console.error(error);
  }
}
