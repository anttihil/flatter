import createHttpError from "http-errors";
import multer from "multer";
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

const uploadFiles = upload.array("images", 1); // limit 1 images, but leave option open for multi upload

export default function uploadImages(req, res, next) {
  uploadFiles(req, res, (err) => {
    log.info("Multer trying to upload files.");
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        // Too many images exceeding the allowed limit
        next(createHttpError(400, "Tried to upload too many files."));
      }
    } else if (err) {
      next(error);
    }
    log.info("No errors in multer uploading.");
    next();
  });
}
