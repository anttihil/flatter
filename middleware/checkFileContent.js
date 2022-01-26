import { fileTypeFromBuffer } from "file-type";
import createHttpError from "http-errors";
import log from "../config/logging.js";

const allowedTypes = [
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/png",
];

// multer mime type checker is based on mere file extension, not actual content
export default async function checkFileType(req, res, next) {
  try {
    const fileTypes = await Promise.all(
      req.files.map(async (file) => await fileTypeFromBuffer(file.buffer))
    );
    const result = fileTypes.every((type) => allowedTypes.includes(type.mime));
    log.info(`Checked if uploaded image types are allowed: ${result}`);
    if (result) {
      next();
    } else {
      next(
        createHttpError(
          400,
          "Please submit an image file of a type specified in the form."
        )
      );
    }
  } catch (error) {
    next(error);
  }
}
