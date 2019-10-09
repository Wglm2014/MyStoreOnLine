const router = require("express").Router();

const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
module.exports = router;