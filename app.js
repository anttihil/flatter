import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mountRoutes from "./routes/index.js";
import helmet from "helmet";

dotenv.config({ path: "./.env" });

const app = express();

app.set("views", "views");
app.set("view engine", "pug");


app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.use(morgan("dev"));

mountRoutes(app);

app.use(express.static("public"));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`The server is up and listening on port ${port}`);
});
