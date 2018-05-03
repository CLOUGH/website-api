// const express = require('express');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const bluebird = require('bluebird');
// const cors = require('cors');
// const fs = require('fs');
// const http = require('http');
// const https = require('https');
// const passport = require('passport');

// const config = require('./config');
// const routes = require('./routes');
// // const userAuth = require('./config/user-auth');

// const app = express();

// // mongoose
// mongoose.Promise = bluebird;
// mongoose.connect(config.mongo.url);

// // passport
// // passport.use('local', userAuth);
// require('./middlewares/passport');

// // app
// app.use(cors());
// app.use(helmet());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());
// app.use(morgan('tiny'));
// app.use('/', routes);

// // https
// if (config.ssl.enabled) {
//   const credentials = {
//     key: fs.readFileSync(config.ssl.key),
//     ca: fs.readFileSync(config.ssl.chain),
//     cert: fs.readFileSync(config.ssl.cert)
//   };

//   https.createServer(credentials, app).listen(config.server.httpsPort, () => {
//     console.log('Server listening on port %d in %s mode', config.server.httpsPort, app.settings.env);
//   });
// }

// http.createServer(app).listen(config.server.port, () => {
//   console.log('Server listening on port %d in %s mode', config.server.port, app.settings.env);
// });

// module.exports = app;
