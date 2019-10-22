
const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");
const dc = require("../dataControllers/stores.js");

router.get("/", (req, res) => {
    return res.render('index.handlebars')
});

router.get("/dashboard", isAuthenticated, (req, res) => {
    const pic = req.user.first_name;
    const foto = req.user.foto ? req.user.foto : pic.substring(0, 1);
    const user = { foto: foto, name: req.user.name }
    res.render('dashboard', user);
});

router.get("/customer-account", isAuthenticated, (req, res) => {
    res.render("profile", ({ user: req.user }));
});

router.get("/seller-store", isAuthenticated, (req, res) => {
    console.log(typeof (dc.getStores));
    const storeData = dc.getStores(req.user._id);
    res.render("store", ({ storeData }));

});

router.get("/store-product", (req, res) => {

    res.render("products");
});

module.exports = router;
