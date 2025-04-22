const express = require('express');
const multer = require('multer');
const { uploadCsv } = require('../controllers/csvUploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-csv', upload.single('file'), uploadCsv);

module.exports = router;
