
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
            console.log("req login");
            console.log(err);
            if (err) {
                console.log(err);
                return res.json({ success: false, message: err });
            } else {
                console.log("back from deserialized");
                res.json({ success: true, message: "Welcome" });

            }

        });

    })(req, res, next);

});



router.post("/api/login", function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        console.log("user");
        console.log(user);
        if (err) {
            console.error(err);
            return res.json({ success: false, message: err });
        }
        if (!user) {
            console.error(info.message);
            return res.json({ success: false, message: info.message })
        }
        req.logIn(user, err => {
            console.log("req login");
            console.log(err);
            console.log(user);
            if (err) {
                console.log(err);
                return res.json({ success: false, message: err });
            } else {
                console.log("back from deserialized");
                res.json({ success: true, message: "loggin success" });
            }
        });

    })(req, res, next);
});

// google auth
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

router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }))

router.get("auth/facebook/callback",
    passport.authenticate("facebook"), (req, res) => {
        res.redirect("/dashboard");
    });

router.get('/api/logout', (req, res) => {
    req.logOut();
    res.redirect('/');

});

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;




