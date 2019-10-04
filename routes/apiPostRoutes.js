const router = require("express").Router();
//require("../config/passport");
const uuidv4 = require('uuid/v4');
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");



router.post("/api/customer", async (req, res) => {
    //console.log("add c");
    console.log(req.body);
    try {
        const userExist = await User.findOne({ email: req.body.email });
        //console.log("after search for user");
        console.log(userExist);
        if (userExist) {
            res.json({ success: false, error: "email already in use by other user" });
        }

        //if email does not exist create record
        console.log("try to saver new user");
        const gid = uuidv4();
        //console.log(gid);
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
            console.log(user);
            res.json({ success: true, msg: "user created" });
        } catch (err) {
            console.error(err);
            res.json({ success: false, error: `${err.name}: ${err.errmsg}` });
        }
    } catch (err) {
        res.json({ success: false, error: `${err.name}: ${err.errmsg}` });
    }

});


module.exports = router;