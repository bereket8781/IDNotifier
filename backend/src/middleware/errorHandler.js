const logger = require('../config/logger');

/**
 * Global error handler.
 * Should be mounted after all routes to catch any errors.
 */
function errorHandler(err, req, res, next) {
  // Log full stack for debugging
  logger.error(err.stack);

  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
}

module.exports = errorHandler;