const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/users')
  .get((...args) => controller.users(...args));


module.exports = router;
