
const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");



router.get("/", (req, res) => {
    //console.log("index");
    return res.render('index.handlebars')
});


router.get("/dashboard", isAuthenticated, (req, res) => {
    console.log("dashboard 1");
    //console.log(req.user);
    res.render('dashboard', { foto: req.user.foto, name: req.user.name });
});


/*router.get("/farmer-account", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/farmerRegister.html"));
});
router.get("/shopper-account", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/shopperRegister.html"));
});
router.get("/customer-account", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/customerRegister.html"));
});

router.get("/farmer-product", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/addProduct.html"));
});
router.get("/customerShop", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/customerShop.html"));
});*/
module.exports = router;
