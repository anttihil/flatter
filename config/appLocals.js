import { selectBoards } from "../services/boardService.js";
import db from "./db.js";

export async function boardAppLocals(app) {
  try {
    const result = await selectBoards();
    app.locals.boards = result;
    console.log(app.locals);
  } catch (error) {
    console.error(error);
  }
}
