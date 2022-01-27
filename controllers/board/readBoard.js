import log from "../../config/logging.js";
import { selectPosts } from "../../services/boardService.js";

export default async function readBoard(req, res, next) {
  try {
    let boardList = [];
    if (req.params.boardName === "all") {
      boardList = req.app.locals.boards;
    } else {
      boardList.push(req.params.boardName);
    }

    let page = req.query.page ?? 0;
    let sort = req.query.sort ?? "new";
    log.info(
      `Selecting posts from ${boardList.join(
        ", "
      )}, page: ${page}, sort: ${sort}`
    );
    const posts = await selectPosts(boardList, page, sort);
    console.log(posts);
    res.status(200).render("index", { posts: posts });
  } catch (error) {
    next(error);
  }
}
