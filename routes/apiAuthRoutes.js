
const router = require("express").Router();
//const db = require("../models");
const passport = require("passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

//local authenticate
router.post("/api/login", passport.authenticate("local"), (req, res) => {
    //res.json({ success: true, user: req.user.email });
    //render dashboard
    res.redirect("/dashboard");
});

// google auth
router.get('/auth/google',passport.authenticate('google', {
        scope: ['profile', 'email']})
        );

router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        //switch to render dashboard
        //console.log("callback data");
        //console.log(req.user);
        res.redirect("/dashboard");
    }
);

router.get('/api/logout', (req, res) => {
    req.logout();
    console.log("loggedout");
    res.redirect('/');
});

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

router.get("/", (req, res) => { 
    res.render("index") 
});

router.get("/dashboard", isAuthenticated,(req, res) => {
     res.render("dashboard") 
    });

module.exports = router;




