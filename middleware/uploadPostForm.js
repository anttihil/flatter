import createHttpError from "http-errors";
import multer from "multer";
import log from "../config/logging.js";

const multerStorage = multer.memoryStorage();

const allowedTypes = [
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/png",
];
// This should check for file size
// and file type
function multerFilter(req, file, cb) {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
}

const multerLimits = {
  files: 1,
  fileSize: 5000000,
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: multerLimits,
});

export const uploadPostForm = upload.array("image", 1); // limit 1 images, but leave option open for multi upload

export default uploadPostForm;
