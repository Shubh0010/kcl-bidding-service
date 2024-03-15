const redis = require('redis');

const connectToRedis = () => {
  console.log("Connecting to Redis...");

  const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379
  });

  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  client.on('error', (err) => {
    console.error(`Error connecting to Redis: ${err}`);
  });

  return client;
}

module.exports = {
  connectToRedis
};