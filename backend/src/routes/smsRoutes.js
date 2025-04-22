const express = require('express');
const { processSmsJobs } = require('../controllers/smsController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/sms/process-sms
router.post('/process-sms', authenticateToken, processSmsJobs);

module.exports = router;