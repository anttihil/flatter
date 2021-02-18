const express = require("express");
const categories = express.Router();
const db = require("../db/");

// get all categories
categories.get("/", async (req, res) => {
  try {
    const categoriesResult = await db.query(
      "SELECT * FROM categories ORDER BY name ASC"
    );
    res.status(200).json({
      status: "success",
      categories: categoriesResult.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//post a new category
categories.post("/", async (req, res) => {
  try {
    const postedResult = await db.query(
      "INSERT INTO categories name values $1 returning *",
      [req.body.name]
    );
    res.status(201).json({
      status: "success",
      categories: categoriesResult.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//delete a category
categories.delete("/:id", async (req, res) => {
  try {
    const deletedResult = await db.query(
      "DELETE FROM categories WHERE category_id=$1 returning *",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      categories: categoriesResult.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//update the name of a category
categories.put("/:id", async (req, res) => {
  try {
    const updatedResult = await db.query(
      "UPDATE categories SET (name=$1) WHERE (category_id=$2) RETURNING *",
      [req.body.name, req.params.id]
    );
    res.status(200).json({
      status: "success",
      categories: categoriesResult.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = categories;
