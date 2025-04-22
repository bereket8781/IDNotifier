const { Sequelize } = require('sequelize');
const { db: dbConfig } = require('./index');

const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.password,
  {
    host:     dbConfig.host,
    port:     dbConfig.port,
    dialect:  dbConfig.dialect,
    logging:  false,
    pool: {
      max:     10,
      min:     0,
      acquire: 30000,
      idle:    10000,
    },
  }
);

module.exports = sequelize;