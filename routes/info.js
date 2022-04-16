const express = require('express');
const router = express.Router();

const { about, getChart } = require('../controller/info');

router.route('/about').get(about);
router.route('/chart').get(getChart);

module.exports = router;
