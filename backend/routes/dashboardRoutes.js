const express = require('express');
const { authenticated } = require('../middleware/authMiddleware');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/data', authenticated, getDashboardData);

module.exports = router;