import { selectBoards } from "../services/boardService.js";
import db from "./db.js";

export async function boardAppLocals(app) {
  try {
    const result = await selectBoards();
    const boards = result.map((object) => object.board_name);
    app.locals.boards = boards;
    console.log(app.locals);
  } catch (error) {
    console.error(error);
  }
}
