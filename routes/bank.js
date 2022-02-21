const express = require("express");
const router = express.Router();

const { getBanks } = require("../controller/bank");


router.route("/info").get(getBanks);

module.exports = router;
