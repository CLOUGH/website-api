const jwks = require('jwks-rsa');
const jwt = require('express-jwt');


const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://warrenclough.auth0.com/.well-known/jwks.json'
  }),
  // This is the identifier we set when we created the API
  audience: 'https://warrenclough.auth0.com/api/v2/',
  issuer: 'warrenclough.auth0.com', // e.g., you.auth0.com
  algorithms: ['RS256']
});

module.exports = authCheck;
