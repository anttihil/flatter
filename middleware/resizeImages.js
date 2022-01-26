import sharp from "sharp";
import log from "../config/logging.js";

export default async function resizeImages(req, res, next) {
  try {
    if (!req.files) return next();

    log.info(`Starting to process images.`);

    req.body.images = await Promise.all(
      req.files.map(async (file) => {
        const thumbnail = await sharp(file.buffer)
          .resize({ width: 320, withoutEnlargement: true })
          .webp()
          .toBuffer();

        const original = await sharp(file.buffer).webp().toBuffer();

        return { thumbnail, original };
      })
    );
    log.info(`The images have been resized and compressed.`);
    next();
  } catch (error) {
    next(error);
  }
}
