const fs       = require('fs');
const path     = require('path');
const Sequelize= require('sequelize');
const config   = require('../config').db;

const sequelize = new Sequelize(
  config.name,
  config.user,
  config.password,
  {
    host:    config.host,
    port:    config.port,
    dialect: config.dialect,
    logging: false,
  }
);

// Dynamically import all model files
const db = {};
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Apply associations if defined
Object.values(db)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;