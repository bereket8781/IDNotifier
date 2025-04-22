const express = require('express');
const multer = require('multer');
const { importCsv } = require('../controllers/importController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Protect this route if you want only authenticated users to import
router.post('/', authenticateToken, upload.single('file'), importCsv);

module.exports = router;