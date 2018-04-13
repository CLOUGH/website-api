const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const authenticated = require('../../middlewares/authenticated');

router.route('/')
  .post(authenticated, (...args) => controller.upload(...args));

router.route('/:fileName')
  .delete(authenticated, (...args) => controller.delete(...args))
  .get((...args) => controller.getFile(...args));

module.exports = router;
