const express = require('express');
const router = express.Router();
const { login } = require('../controller/auth');

console.log('Routes');
router.route('/').get((req, res, next) => {
  res.status(200).json({
    message: true,
  });
});
console.log(login);
router.route('/').post(login);

module.exports = router;
