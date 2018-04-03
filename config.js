const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 3000,
    httpsPort: process.env.HTTPS_PORT || 8443
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/website-api'
  }
};

module.exports = config;
