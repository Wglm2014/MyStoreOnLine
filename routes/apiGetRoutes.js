// Pull in required dependencies
const router = require("express").Router();
const db = require("../models");
const passport = require("../config/passport");


/*
//query just markets, for drop down
router.get("/api/markets", async (req, res) => {
    const markets = await db.Market.findAll({});
    res.json(markets);
});

router.get("/api/markets/:id", async (req, res) => {
    const markets = await db.Market.findAll({ where: [{ id: +req.params.id }] });
    console.log(markets);
    res.json(markets);
});

router.get("/api/farmerData", async (req, res) => {
    console.log(req.user.email);
    const farmerData = await db.Farmer.findOne({ where: [{ email: req.user.email }] });
    res.json(farmerData);

});
//query Farmers and Products filtering by market
router.get("/api/farmerbyMarket", async (req, res) => {

    const FarmerProducts = await db.Farmer.findAll({ where: [{ MarketId: req.body.MarketId }] });
    res.json(FarmerProducts);

});

router.get("/api/customerByEmail", async (req, res) => {

    const customer = await db.Customer.findOne({ where: [{ email: req.user.email }] });
    res.json(customer);

});


router.get("/api/customerById", async (req, res) => {

    const customer = await db.Customer.findOne({ where: [{ id: req.body.id }] });
    res.json(customer);

});
//orders to be prepare by shopper, or are ready to be picked up, or they have been picked up
router.get("/api/orders/:marketId/:status/:date", async (req, res) => {
    const orders = await db.Order.findAll({ where: [{ MarketId: req.params.marketId }, { status: req.params.status }] }, { include: [db.Order_Detail, db.Customer] });
    res.json(orders);
});

router.get("/api/product-farmer", async (req, res) => {
    console.log(req.body.id);
    const products = await db.Product.findAll({ where: [{ FarmerId: req.body.id }] });
    res.json(products);
});

router.get("/api/product-farmer/:id", async (req, res) => {
    console.log(req.body.id);
    const products = await db.Product.findAll({ where: [{ FarmerId: req.params.id }] });
    res.json(products);
});

router.get("/api/farmers-products", async (req, res) => {
    const farmer = await db.Farmer.findAll({ include: [db.Market] });
    res.json(farmer);
});


router.get("/api/test", (req, res) => {
    db.Farmer.findAll({ include: [db.Market] }).then((farmers) => {
        res.json(farmers);
    });
});
/*router.get("api/category", async (req, res) => {
    const category = await db.Category.findAll({});
    res.json(category);
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/api/isLoggedin", function (req, res) {
    if (req.user) {
        res.json({ success: true, userEmail: req.user.email });
    } else {
        res.json({ success: false, userEmail: "user not logged in" });
    }
});

router.get("/api/payments/:id", async function (req, res) {
    const paymentMethods = await db.PaymentMethod.findAll({ where: { id: req.params.id } });
    res.json(paymentMethods);
});
*/
module.exports = router;