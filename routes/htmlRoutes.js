
const router = require("express").Router();

router.get("/", (req, res) => { res.render("index") });
/*const isAuthenticated = require("../config/middleware/isAuthenticated");



router.get("/farmer-account", (req, res) => {
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
