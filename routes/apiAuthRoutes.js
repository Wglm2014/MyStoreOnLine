
const router = require("express").Router();
const passport = require("../config/passport");

router.post("/api/customer", function (req, res, next) {
    passport.authenticate("local-signup", function (err, user, info) {
        if (err) {
            //console.error(err);
            return next(err);
        }
        if (!user) {
            //console.error(info.message);
            return res.json({ success: false, message: info.message })
        }
        req.logIn(user, err => {

            if (err) {
                return res.json({ success: false, message: err });
            } else {
                res.json({ success: true, message: "Welcome" });

            }

        });

    })(req, res, next);

});



router.post("/api/login", function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {

        if (err) {
            return res.json({ success: false, message: err });
        }
        if (!user) {
            return res.json({ success: false, message: info.message })
        }
        req.logIn(user, err => {

            if (err) {
                return res.json({ success: false, message: err });
            } else {
                res.json({ success: true, message: "loggin success" });
            }
        });

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




