const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('./config');

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

require('./api/user/seeder');
