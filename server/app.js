const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mountRoutes = require("./routes/index");

const app = express();

mountRoutes(app);

app.use(morgan);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
