const Redis = require('ioredis');
const { redis: redisConfig } = require('./index');

// If your Redis requires auth, include password in options
const redis = new Redis({
  host:     redisConfig.host,
  port:     redisConfig.port,
  password: redisConfig.password || undefined,
});

redis.on('connect',  () => console.log('✅ Connected to Redis'));
redis.on('error',    (err) => console.error('❌ Redis error', err));

module.exports = redis;