import createHttpError from "http-errors";
import multer from "multer";
import log from "../config/logging.js";
import config from "config";

const multerStorage = multer.memoryStorage();

// This should check for file size
// and file type
function multerFilter(req, file, cb) {
  if (config.get("allowedFileTypes").includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
}

const multerLimits = {
  files: config.get("uploadFilesMax"),
  fileSize: config.get("uploadFileSizeLimit"),
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: multerLimits,
});

export const uploadPostForm = upload.array("image", 1); // limit 1 images, but leave option open for multi upload

export default uploadPostForm;
