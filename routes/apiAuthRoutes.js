
const router = require("express").Router();
const passport = require("passport");


router.post("/api/login", function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            console.error(info.message);
            return res.json({ success: false, message: info.message })
        }
        console.log(req.user);
        res.redirect("/dashboard");
    })(req, res, next);
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
        res.redirect("/dashboard");
    }
);

router.get('/api/logout', (req, res) => {
    req.logOut();
    res.redirect('/');

});

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;




