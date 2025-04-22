const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  app: {
    port: parseInt(process.env.PORT, 10) || 5000,
  },
  db: {
    name:     process.env.DB_NAME     || 'idnotifier',
    user:     process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || '',
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT, 10) || 5432,
    dialect:  'postgres',
  },
  smpp: {
    host:     process.env.SMPP_HOST       || 'localhost',
    port:     parseInt(process.env.SMPP_PORT, 10) || 2775,
    systemId: process.env.SMPP_SYSTEM_ID  || 'smppclient1',
    password: process.env.SMPP_PASSWORD   || 'password',
  },
  redis: {
    host:     process.env.REDIS_HOST     || '127.0.0.1',
    port:     parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },
  jwt: {
    secret:   process.env.JWT_SECRET     || 'supersecretkey',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
};