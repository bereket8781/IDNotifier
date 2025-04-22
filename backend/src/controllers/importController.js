const processCsv = require('../services/csvProcessor');

async function importCsv(req, res, next) {
  try {
    const filePath = req.file.path;
    const result = await processCsv(filePath);
    res.status(200).json({
      message:  'CSV imported successfully',
      imported: result.count
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { importCsv };