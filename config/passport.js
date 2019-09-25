const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refeshToken, profile, done) => {
      //console.log(accessToken);
      //console.log(refeshToken);
      //console.log(profile);
      //console.log(done);
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        try {
          const user = await new User({
            googleId: profile.id,
            name: profile._json.given_name,
            last_name: profile._json.family_name,
            foto: profile._json.foto,
            email: profile._json.email
          }).save();
          done(null, user);
        } catch (err) {
          console.log(err);
        }
      }
      catch (err) {
        console.log(err);
      }

    }));
