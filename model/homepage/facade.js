const Facade = require('../../lib/facade');
const homepageSchema = require('./schema');

class HomepageFacade extends Facade {}

module.exports = new HomepageFacade('Homepage', homepageSchema);
