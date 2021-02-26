const express = require("express");
const morgan = require("morgan");
require("dotenv").config({ path: "../.env" });
const mountRoutes = require("./routes/index");

const app = express();

app.use(express.json());

mountRoutes(app);

app.use(morgan("short"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The server is up and listening on port ${port}`);
});
