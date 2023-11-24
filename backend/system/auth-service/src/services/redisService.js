const redis = require("redis");
const client = redis.createClient({
    legacyMode: true ,
    url: 'redis://redis:6379',
});

(async () => {
  client.connect();
})();

module.exports = client;
