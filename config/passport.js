const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const uuidv4 = require('uuid/v4');

const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/users");

passport.serializeUser((user, done) => {
  console.log("serializing")
  console.log(user);
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  User.findById(id).then((err, user) => {
    console.log("desrializing");
    console.log(user);
    done(err, user);
  });
});

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use("google",
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
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }
        try {
          user = await new User({
            googleId: profile.id,
            email: profile._json.email,
            password: "",
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            foto: profile._json.picture,
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

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APPID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: "/auth/facebook/callback"
},
  function (accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(refeshToken);
    console.log(profile);
    console.log(done);
    /*try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      }
      try {
        user = await new User({
          googleId: profile.id,
          email: profile._json.email,
          password: "",
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          foto: profile._json.picture,
          address: "",
          city: "",
          zip: "",
          state: "",
          telephone: "",
          telephone_other: "",
          account_status: true,
          account_type: "facebook"
        }).save();
        done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
    catch (err) {
      console.log(err);
    }*/

  }
));



// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use("local", new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  async (req, email, password, done) => {

    // When a user tries to sign in this code runs
    try {
      const user = await User.findOne({ email: email });
      console.log("local passport");
      console.log(user);
      // If there's no user with the given email
      if (!user) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // console.log(user.password);
      // If there is a user with the given email, but the password the user gives us is incorrect
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      req.user = user;
      req.user.save();
      done(null, user);
    } catch (err) {
      return done(null, false, { message: `${err.name}: ${err.errmsg}` });
    }
  }
));

passport.use("local-signup", new LocalStrategy({ usernameField: "email", passwordField: "password", passReqToCallback: true },
  async (req, email, password, done) => {
    //console.log("add c");
    //console.log(req.body);
    try {
      const user = await User.findOne({ email });
      console.log("after search for user");
      //console.log(user);
      if (user) {
        return done(null, false, { message: "Email already being use by other user" });
      }
      //if email does not exist create record
      console.log("try to saver new user");
      const gid = uuidv4();
      console.log(gid);
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      try {
        const user = await new User({
          googleId: gid,
          email: req.body.email,
          password: password,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          foto: "",
          address: "",
          city: "",
          zip: "",
          state: "",
          telephone: "",
          telephone_other: "",
          account_status: true,
          account_type: "local"
        }).save();
        //console.log(user);
        return done(null, user);

      } catch (err) {
        console.error(err);
        done(null, false, { message: `${err.name}: ${err.errmsg}` });
      }
    } catch (err) {
      done(null, false, { message: `${err.name}: ${err.errmsg}` });
    }
  }

));



module.exports = passport;