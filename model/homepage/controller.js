const Controller = require('../../lib/controller');
const homepageFacade = require('./facade');

class HomepageController extends Controller {}

module.exports = new HomepageController(homepageFacade);
