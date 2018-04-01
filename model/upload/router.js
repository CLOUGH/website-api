const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .post((...args) => controller.upload(...args));

router.route('/:fileName')
  .delete((...args) => controller.delete(...args))
  .get((...args) => controller.getFile(...args));

module.exports = router;
