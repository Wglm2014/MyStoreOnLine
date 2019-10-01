const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

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
      // console.log(profile);
      //console.log(done);
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        try {
          const user = await new User({
            googleId: profile.id,
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            foto: profile._json.picture,
            email: profile._json.email,
            account_status: true,
            address: "",
            city: "",
            zip: "",
            state: "",
            telephone: "",
            telephone_other: "",
            account_status: true,
            account_type: "google"
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


// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  async (email, password, done) => {
    // When a user tries to sign in this code runs
    const dbUser = User.findOne({ email: email });
    // If there's no user with the given email
    if (!dbUser) {
      return done(null, false, {
        message: "Incorrect email."
      });
    }
    // If there is a user with the given email, but the password the user gives us is incorrect
    else if (!dbUser.validPassword(password)) {
      return done(null, false, {
        message: "Incorrect password."
      });
    }
    // If none of the above, return the user
    return done(null, dbUser);

  }
));