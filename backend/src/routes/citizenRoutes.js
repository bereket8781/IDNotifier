const express = require('express');
const { getAllCitizens, getCitizenById } = require('../controllers/citizenController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/citizens/
router.get('/', authenticateToken, getAllCitizens);

// GET /api/citizens/:id
router.get('/:id', authenticateToken, getCitizenById);

module.exports = router;