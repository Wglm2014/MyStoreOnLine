
const router = require("express").Router();
//const db = require("../models");
const passport = require("passport");

//local authenticate
router.post("/api/login", passport.authenticate("local"), (req, res) => {
    //res.json({ success: true, user: req.user.email });
    //render dashboard
    res.redirect("/");
});

// google auth
router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        //switch to render dashboard
        res.redirect('/');
    }
);

router.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;




