
const router = require("express").Router();
const passport = require("passport");

router.get("/api/login", passport.authenticate("local"), function (req, res) {
    // console.log("after post");
    // console.log(req.user);
    //res.json({ success: true, msg: "login succes" });
    res.redirect("/dashboard");

});
// google auth
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
})
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

module.exports = router;




