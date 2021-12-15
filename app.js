import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mountRoutes from "./routes/index.js";
import helmet from "helmet";
import passportSetup from "./config/passport.js";
import db from "./config/db.js";

dotenv.config({ path: "./.env" });

const app = express();

passportSetup();

app.set("views", "views");
app.set("view engine", "pug");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));

app.use(
  expressSession({
    store: new pgSession(expressSession)({
      pgPromise: db,
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

passportSetup();
app.use(passport.initialize());
app.use(passport.session());

mountRoutes(app);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`The server is up and listening on port ${port}`);
});
