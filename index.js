const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');


const config = require('./config');
const routes = require('./routes');

const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/', routes);

// https
const credentials = {
  key: fs.readFileSync('ssl/key.pem'),
  ca: fs.readFileSync('ssl/csr.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};

https.createServer(credentials, app).listen(config.server.httpsPort, () => {
  console.log('Server listening on port %d in %s mode', config.server.httpsPort, app.settings.env);
});
http.createServer(app).listen(config.server.port, () => {
  console.log('Server listening on port %d in %s mode', config.server.port, app.settings.env);
});

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// app.listen(config.server.port, () => {
//   console.log(`Magic happens on port ${config.server.port}`);
// });
// httpServer.listen(config.server.port);

module.exports = app;
