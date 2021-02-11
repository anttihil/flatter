const express = require("express");
const homepage = express.Router();
const db = require("../db");

homepage.get("/", async (req, res) => {
  const posts = await db.query();
});
