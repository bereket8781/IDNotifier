const fs = require('fs').promises;
const path = require('path');

/**
 * Deletes a file at the given path if it exists.
 * @param {string} filePath
 */
async function deleteFileIfExists(filePath) {
  try {
    const resolved = path.resolve(filePath);
    await fs.unlink(resolved);
  } catch (err) {
    // ignore if file doesn't exist
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
}

module.exports = { deleteFileIfExists };