const Facade = require('../../lib/facade');
const pageSchema = require('./schema');

class PageFacade extends Facade {}

module.exports = new PageFacade('Page', pageSchema);
