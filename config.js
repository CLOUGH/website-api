const path = require('path');
const env = require('dotenv');

env.config({
  path: path.join(__dirname, '.env')
});


const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 3000,
    httpsPort: process.env.HTTPS_PORT || 8443
  },
  ssl: {
    key: process.env.SSL_KEY,
    chain: process.env.SSL_CHAIN,
    cert: process.env.SSL_CERT,
    enabled: process.env.SSL_ENABLED || false
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/website-api'
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  google: {
    keyFile: process.env.GOOGLE_KEY_FILE,
    analytics: {
      viewId: process.env.GOOGLE_ANALYTICS_VIEW_ID
    }
  }
};

module.exports = config;
