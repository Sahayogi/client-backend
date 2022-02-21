const express = require('express');
const router = express.Router();

const { getVendors } = require('../controller/vendor');

router.route('/info').get(getVendors);

module.exports = router;
