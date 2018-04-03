const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, ".env")
});


console.log(process.env.SSL_KEY);
const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 3000,
    httpsPort: process.env.HTTPS_PORT || 8443
  },
  ssl: {
    key: process.env.SSL_KEY || 'ssl/key.pem',
    chain: process.env.SSL_CHAIN || 'ssl/chain.pem',
    cert: process.env.SSL_CERT || 'ssl/cert.pem'
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/website-api'
  }
};

module.exports = config;
