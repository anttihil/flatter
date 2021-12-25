import express from "express";
import expressSession from "express-session";
import flash from "connect-flash";
import pgSession from "connect-pg-simple";
import morgan from "morgan";
import dotenv from "dotenv";
import mountRoutes from "./routes/index.js";
import helmet from "helmet";
import passportSetup from "./config/passport.js";
import passport from "passport";
import db from "./config/db.js";
import { adminSetup } from "./config/adminSetup.js";

dotenv.config({ path: "./.env" });

adminSetup();

const app = express();
const sessionStore = pgSession(expressSession);

app.set("views", "views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(
  expressSession({
    store: new sessionStore({
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

app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});

mountRoutes(app);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`The server is up and listening on port ${port}`);
});
