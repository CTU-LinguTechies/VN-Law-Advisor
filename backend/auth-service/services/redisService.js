const redis = require('redis');
const config = require('../config');
const client = redis.createClient({
    legacyMode: true,
    url: `redis://${config[process.env.ENVIRONMENT || 'development'].redisHost}:6379`,
});

(async () => {
    client.connect();
})();

module.exports = client;
