import passport from "passport"
import Strategy from "passport-local/lib";
import { argon2i } from "argon2";
import db from "./db";

export default function passportSetup() {

    function verifyHashedPassword(email, password) {

    }

    function verify(email, password, done) {
        try {
            const queryResult = await db.any("SELECT user_email, user_password, user_id, user_nickname FROM users WHERE username = $1", [username])
            if (!queryResult) {return done(null, false, {message: 'Incorrect username or password.'})}
            
        } catch (error) {
            return done(err)
        }
        
        db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [ username ], function(err, row) {
          if (err) { return done(err); }
          if (!row) { return done(null, false, { message: 'Incorrect username or password.' }); }
          
          crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return done(err); }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
              return done(null, false, { message: 'Incorrect username or password.' });
            }
            
            var user = {
              id: row.id.toString(),
              username: row.username,
              displayName: row.name
            };
            return done(null, user);
          });
        });
      }
  // Configure the local strategy for use by Passport.
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `done` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new Strategy(function(username, password, done) {
    try {
        const queryResult = await db.any("SELECT username, password, userid FROM users WHERE username = $1", [username])
    } catch (error) {
        
    }
    
    db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [ username ], function(err, row) {
      if (err) { return done(err); }
      if (!row) { return done(null, false, { message: 'Incorrect username or password.' }); }
      
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return done(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        
        var user = {
          id: row.id.toString(),
          username: row.username,
          displayName: row.name
        };
        return done(null, user);
      });
    });
  }));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, done) {
    process.nextTick(function() {
      done(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
      return done(null, user);
    });
  });

};