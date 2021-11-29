import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { mountRoutes } from "./routes/index";
import helmet from "helmet";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(cors());
app.use(helmet());

app.use(express.json());

mountRoutes(app);

app.use(morgan("short"));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`The server is up and listening on port ${port}`);
});
