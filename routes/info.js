const express = require('express');
const router = express.Router();

const { about } = require('../controller/info');

router.route('/about').get(about);

module.exports = router;
