import passport from "passport";
import { Strategy } from "passport-local";
import { verify } from "argon2";
import {
  selectUserForAuthentication,
  selectUserForDeserialize,
} from "../services/userService.js";

const options = {
  usernameField: "email",
  passwordField: "password",
};

/*
This sets up the PassportJS library.

Why is there a verify function under "if !(queryresult)" that seems to do nothing?

It's there to mimic the behavior where a valid user has been found and their password is being verified.
If the invalid username were to return a response to the frontend earlier than the valid username case,
then a malicious user could use the time difference to map out which usernames are valid and which are not.
The dummy verification call should (nearly) eliminate the time difference. 
*/

export default function passportSetup() {
  async function verifyHashedPassword(username, password, done) {
    try {
      const queryResult = await selectUserForAuthentication(username);
      if (!queryResult) {
        await verify(
          "$argon2i$v=19$m=4096,t=3,p=1$RPyky3lf9fTjGS31obht4g$yf+xpagJFvBJJtWqWKDyVvlDbi9TxvYzJ4bI4KUe6Kg",
          "passwordISusername"
        );
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      const user = {
        id: queryResult.id,
        email: queryResult.email,
        username: queryResult.username,
        role: queryResult.role,
        permaBan: queryResult.permaBan,
        tempBan: queryResult.tempBan,
        isVerified: queryResult.isVerified,
      };
      if (await verify(queryResult.password, password)) {
        return done(null, user);
      } else {
        done(null, false, { message: "Incorrect username or password." });
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
        id: queryResult.id,
        email: queryResult.email,
        username: queryResult.username,
        role: queryResult.role,
        permaBan: queryResult.permaBan,
        tempBan: queryResult.tempBan,
        isVerified: queryResult.isVerified,
      };
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
