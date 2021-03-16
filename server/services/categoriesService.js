const db = require("../db");

// get all categories
exports.getAllCategories = async () => {
  try {
    const gotAllCategories = await db.query(
      "SELECT * FROM categories ORDER BY name ASC"
    );
    return gotAllCategories;
  } catch (error) {
    console.log(error);
  }
};

//post a new category
exports.postCategory = async (req) => {
  try {
    const postedCategory = await db.query(
      "INSERT INTO categories name values $1 returning *",
      [req.body.name]
    );
    return postedCategory;
  } catch (error) {
    console.log(error);
  }
};

//delete a category
exports.deleteCategory = async (req) => {
  try {
    const deletedCategory = await db.query(
      "DELETE FROM categories WHERE category_id=$1 returning *",
      [req.params.category_id]
    );
    return deletedCategory;
  } catch (error) {
    console.log(error);
  }
};

//update the name of a category
exports.updateCategory = async (req) => {
  try {
    const updatedCategory = await db.query(
      "UPDATE categories SET name=$1 WHERE category_id=$2 RETURNING *",
      [req.body.name, req.params.category_id]
    );
    return updatedCategory;
  } catch (error) {
    console.log(error);
  }
};
