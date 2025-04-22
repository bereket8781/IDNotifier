const app       = require('./index');
const config    = require('./config');
const { sequelize } = require('./models');
const logger    = require('./config/logger');

async function startServer() {
  try {
    // Verify & sync database
    await sequelize.authenticate();
    logger.info('✅ Database connection established');
    await sequelize.sync();
    logger.info('✅ Database synchronized');

    // Start HTTP server
    app.listen(config.app.port, () => {
      logger.info(`🚀 Server listening on port ${config.app.port}`);
    });
  } catch (err) {
    logger.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();