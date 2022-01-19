import { selectBoards } from "../services/boardService.js";
import log from "./logging.js";

export async function boardAppLocals(app) {
  try {
    const result = await selectBoards();
    const boards = result.map((object) => object.name);
    app.locals.boards = boards;
    log.info(`Boards set in locals: ${app.locals.boards.join(", ")}`);
  } catch (error) {
    log.error(error);
  }
}
