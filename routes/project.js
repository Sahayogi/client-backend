// Project create read update delete
// Create, Update, delete => aidAgency
// Read => User
const express = require('express');

const {
  getProjects,
  getProjectDetail,
  updateDonatedAmount,
} = require('../controller/project');

const router = express.Router();
router.route('/').get(getProjects);
router.route('/:id').get(getProjectDetail);
router.route('/updateAmount').post(updateDonatedAmount);

// Update donated amount

module.exports = router;
