const fs = require('fs');
const environment = process.env.ENVIRONMENT || 'development';
let accessKey = process.env.ACCESS_TOKEN_KEY || 'super_secret_access_key';
let refreshKey = process.env.REFRESH_TOKEN_KEY || 'super_secret_refresh_key';

if (environment === 'production') {
    accessKey = fs.readFileSync('/run/secrets/access_token_key');
    refreshKey = fs.readFileSync('/run/secrets/refresh_token_key');
}

module.exports = {
    development: {
        dialect: process.env.DB_DIALECT || 'mysql',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'auth',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        redisHost: process.env.REDIS_HOST || 'localhost',
    },
    security: {
        accessKey,
        refreshKey,
    },
};
