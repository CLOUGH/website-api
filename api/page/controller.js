const Controller = require('../../lib/controller');
const pageFacade = require('./facade');

class PageController extends Controller {}

module.exports = new PageController(pageFacade);
