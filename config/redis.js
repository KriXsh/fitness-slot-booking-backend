const redis = require('redis');
require('dotenv').config();

let redisClient;

const getRedisClient = async () => {
    if (!redisClient) {
        redisClient = redis.createClient({
            url: process.env.REDIS_URL
        });

        redisClient.on('error', (err) => {
            console.error('Redis Error:', err);
        });

        try {
            await redisClient.connect();
            console.log('Connected to Redis');
        } catch (error) {
            console.error('Error connecting to Redis:', error);
        }
    }
    return redisClient;
};

module.exports = getRedisClient;
