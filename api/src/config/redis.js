const redis = require('redis');
const client = redis.createClient({
    host: '127.0.0.1',
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
});

client.on('error', err => {
    console.log('Error ' + err);
});

module.exports = client;