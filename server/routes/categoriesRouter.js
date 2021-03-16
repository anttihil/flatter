const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const categoriesRouter = express.Router();

//Below are the http request functions that call the specific Controller (2nd argument) when a request is received at the path in the first argument.

categoriesRouter.get("/", categoriesController.getAllCategoriesController);

categoriesRouter.post("/", categoriesController.postCategoryController);

categoriesRouter.delete(
  ":category_id",
  categoriesController.deleteCategoryController
);

categoriesRouter.put(
  "/:category_id",
  categoriesController.updateCategoryController
);

module.exports = categoriesRouter;
