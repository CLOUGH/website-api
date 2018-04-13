const Controller = require('../../lib/controller');
const postFacade = require('./facade');

class PostController extends Controller {}

module.exports = new PostController(postFacade);
