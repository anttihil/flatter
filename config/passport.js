import passport from "passport";
import { Strategy } from "passport-local";
import { verify } from "argon2";
import {
  selectUserForAuthentication,
  selectUserForDeserialize,
} from "../services/authService.js";

const options = {
  usernameField: "email",
  passwordField: "password",
};

export default function passportSetup() {
  async function verifyHashedPassword(username, password, done) {
    try {
      const queryResult = await selectUserForAuthentication(username);
      console.log(queryResult);
      if (!queryResult) {
        console.log("no result");
        return done(null, false, {
          message: "Incorrect username.",
        });
      }
      const user = {
        id: queryResult.user_id,
        email: queryResult.user_email,
        nickname: queryResult.user_nickname,
        role: queryResult.user_role,
      };
      if (await verify(queryResult.user_password, password)) {
        console.log("verified");
        return done(null, user);
      } else {
        done(null, false, { message: "Incorrect password." });
      }
    } catch (err) {
      return done(err);
    }
  }

  // Configure the local strategy for use by Passport.

  passport.use(new Strategy(options, verifyHashedPassword));

  /*
Serialize method fills req.session.passport.user 
with only the id info. Only that info is attached 
to the response object when it is returned to the client.
*/
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  /* 
Deserialize method restores the whole user details from the database
and passes that onto the req.session.passport.user object for the purposes
of further processing in the backend.
*/
  passport.deserializeUser(async function (id, done) {
    try {
      const queryResult = await selectUserForDeserialize(id);
      const user = {
        id: queryResult.user_id.toString(),
        email: queryResult.user_email,
        nickname: queryResult.user_nickname,
        role: queryResult.user_role,
      };
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
