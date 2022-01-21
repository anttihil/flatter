import log from "../../config/logging.js";

// Consider whether the submit button should be hidden if user is logged in but not email verified
// Also, display message prompting the user to check email.
export default async function readCreatePost(req, res, next) {
  try {
    log.info("Reading create post page.");
    res.status(200).render("createPost");
  } catch (error) {
    next(error);
  }
}
