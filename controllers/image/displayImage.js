import log from "../../config/logging.js";

// Consider whether the submit button should be hidden if user is logged in but not email verified
// Also, display message prompting the user to check email.
export default function displayImage(req, res, next) {
  try {
    log.info(`Displaying image with id: ${req.params.imageId}`);
    res.status(200).render("displayImage", { image: req.params.imageId });
  } catch (error) {
    next(error);
  }
}
