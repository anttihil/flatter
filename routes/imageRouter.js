import { Router } from "express";
import displayImage from "../controllers/image/displayImage.js";
import { param } from "express-validator";

const imageRouter = Router();

imageRouter.route("/:imageId").get(param("imageId").isUUID(4), displayImage);

export default imageRouter;
