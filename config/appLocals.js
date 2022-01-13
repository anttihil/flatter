import { selectBoards } from "../services/boardService.js";

export async function boardAppLocals(app) {
  try {
    const result = await selectBoards();
    const boards = result.map((object) => object.name);
    app.locals.boards = boards;
    console.log(app.locals);
  } catch (error) {
    console.error(error);
  }
}
