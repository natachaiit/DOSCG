require('dotenv').config()
const redis = require('redis');
const { promisify } = require('util');
const clientredis = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || '6379'
});
const getAsync = promisify(clientredis.get).bind(clientredis)

module.exports.getAsync = getAsync;
module.exports.clientredis = clientredis;