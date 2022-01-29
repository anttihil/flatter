import express from "express";
import expressSession from "express-session";
import pgSession from "connect-pg-simple";
import morgan from "morgan";
import log from "./config/logging.js";
import mountRoutes from "./routes/index.js";
import helmet from "helmet";
import passportSetup from "./config/passport.js";
import passport from "passport";
import db from "./config/db.js";
import { adminSetup } from "./config/adminSetup.js";
import { passportMsgLocals, userLocals } from "./middleware/locals.js";
import { boardAppLocals } from "./config/appLocals.js";
import createHttpError from "http-errors";

const sessionStore = pgSession(expressSession);
const app = express();

// Options for express-session middleware
const sessionOptions = {
  store: new sessionStore({
    pgPromise: db,
  }),
  secret: process.env.FOO_COOKIE_SECRET,
  name: process.env.FOO_COOKIE_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionOptions.cookie.secure = true; // serve secure cookies
}

/* A convenience feature that makes sure that there is an admin user.
Settings are in the .env file. */
adminSetup();
/* sets app's local variable "boards" to 
be an array of board names => board names are only queried once. 
If new boards are added, the app needs to be restarted.*/
boardAppLocals(app);

app.set("views", "views");
app.set("view engine", "pug");

/* app.use(
  helmet({
    contentSecurityPolicy: {
      directives: { imgSrc: ["'self'", "data:", "https://images.aihio.org"] },
    },
  })
); */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev", { stream: { write: (msg) => log.http(msg) } }));

app.use(expressSession(sessionOptions));
/* Sets up the authentication strategy, verify function,
userSerialization and userDeserialization for passport sessions.
These need to be in place before passport can process sessions. */
passportSetup();
app.use(passport.initialize());
app.use(passport.session());

/* 
A middleware that attaches user information and messages to the response 
object's local variables so that they are available for view renders.
*/
app.use(passportMsgLocals, userLocals);

/* A function that mounts all the routes to the app. 
Used in order to clean up the app structure. */
mountRoutes(app);

/* Creates and passes down a 404 if there is no route match.   */
app.use(function (req, res, next) {
  next(createHttpError(404, "The resource was not found."));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  log.error(err);
  res.locals.message = err.message;
  res.locals.error = app.get("env") === "development" ? err : {};

  // set response status to error status and render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
