import express from "express";
import expressSession from "express-session";
import pgSession from "connect-pg-simple";
import morgan from "morgan";
import dotenv from "dotenv";
import mountRoutes from "./routes/index.js";
import helmet from "helmet";
import passportSetup from "./config/passport.js";
import passport from "passport";
import db from "./config/db.js";
import { adminSetup } from "./config/adminSetup.js";
import {
  passportMsgLocals,
  userAuthenticationLocals,
} from "./middleware/locals.js";
import { boardAppLocals } from "./config/appLocals.js";

dotenv.config({ path: "./.env" });

/* A convenience feature that makes sure that there is an admin user.
Settings are in the .env file. */
adminSetup();

const sessionStore = pgSession(expressSession);

const app = express();

/* sets app's local variable "boards" to 
be an array of board names => board names are only queried once. 
If new boards are added, the app needs to be restarted.*/
boardAppLocals(app);

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
/* Sets up the authentication strategy, verify function,
userSerialization and userDeserialization for passport sessions.
These need to be in place before passport can process sessions. */
passportSetup();
app.use(passport.initialize());
app.use(passport.session());

/* A middleware that attaches passport authentication
messages (e.g. incorrect password) to a response level
local variables so that they are always available for Pug
rendering.*/
app.use(passportMsgLocals, userAuthenticationLocals);

/* A function that mounts all the routes to the app. 
Used in order to clean up the app structure. */
mountRoutes(app);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`The server is up and listening on port ${port}`);
});
