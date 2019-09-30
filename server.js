const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const expresshb = require("express-handlebars");
const passport = require("passport");
require("dotenv").config();

require("./models/users");
require("./config/passport");
//console.log(process.env.mongoURI);
//const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/fnf_db";
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
//console.log(process.env.AWS_ACCESS_ID_KEY);


app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", expresshb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
const PORT = process.env.PORT || 3000;

const apiaAuthRoute = require("./routes/apiAuthRoutes");
////const apiPostRoutes = require("./routes/apiPostRoutes");
//const apiProductImages = require("./routes/apiProductImages");
//const apiGetRoutes = require("./routes/apiGetRoutes");
//const htmlRoutes = require("./routes/htmlRoutes");
//app.use(apiPostRoutes);
//app.use(apiProductImages);
//app.use(apiGetRoutes);
//app.use("./routes/apiPutRoutes");
//app.use("./routes/apiDeleteRoutes");

app.use(apiaAuthRoute);
//app.use(htmlRoutes);
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
