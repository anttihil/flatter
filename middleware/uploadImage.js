import createHttpError from "http-errors";
import multer from "multer";
import sharp  from "sharp";
import {fileTypeFromBuffer} from 'file-type';

const multerStorage = multer.memoryStorage();


// This should check for file size 
// and file type
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const multerLimits = {
  
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("images", 1); // limit 1 images, but leave option open for multi upload

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
      if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
        next(createHttpError(400, "Tried to upload too many files."))
      }
    } else if (err) {
      next(error)
    }
    // Everything is ok.
    next();
  });
};

// multer mime type checker is based on mere file extension, not actual content
async function checkFileContentType(req, res, next) {
  try {
    const fileTypeArr = req.files.map(async file => await fileTypeFromBuffer(file))
    console.log(fileTypeArr);
    if (fileTypeArr.every(type => ))
  } catch (error) {
    next(error)
  }
}

async function resizeImages (req, res, next) {
  if (!req.files) return next();

  req.body.images = [];

  await Promise.all(
    req.files.map(async file => {
      const newFilename = ...;

      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`upload/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};

