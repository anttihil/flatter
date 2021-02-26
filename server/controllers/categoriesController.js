const categoriesService = require("../services/categoriesService");

//calls the get all categories service function and sends a response
exports.getAllCategoriesController = async (req, res) => {
  try {
    const gotAllCategories = await categoriesService.getAllCategories();
    res.status(200).json({
      status: "success",
      categories: gotAllCategories.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the post category service function and sends a response
exports.postCategoryController = async (req, res) => {
  try {
    const postedCategory = await categoriesService.postCategory(req);
    res.status(201).json({
      status: "success",
      categories: postedCategory.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the delete category service function and sends a response
exports.deleteCategoryController = async (req, res) => {
  try {
    const deletedCategory = await categoriesService.deleteCategory(req);
    res.status(200).json({
      status: "success",
      categories: deletedCategory.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

//calls the update category service function and sends a response
exports.updateCategoryController = async (req, res) => {
  try {
    const updatedCategory = await categoriesService.updateCategory(req);
    res.status(200).json({
      status: "success",
      categories: updatedCategory.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};
