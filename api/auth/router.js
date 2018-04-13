const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/login')
  .post((...args) => controller.login(...args));


module.exports = router;
