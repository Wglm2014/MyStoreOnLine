const router = require("express").Router();
const passport = require("passport");
//require("../config/passport");
const uuidv4 = require('uuid/v4');
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/api/login", passport.authenticate("local"), function (req, res) {
    
    res.json({ success: true, user: req.user.email });
});

router.post("/api/customer", async (req, res) => {
    console.log("add c");
    try {
        const user = new User({
            googleId: uuidv4(),
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: "",
            city: "",
            zip: "",
            state: "",
            telephone: "",
            telephone_other: "",
            account_status: req.body.account_status,
            account_type: "local"
        });
        console.log(user);
        res.redirect("/api/login");
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});


module.exports = router;