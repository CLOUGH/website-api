const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const passport = require('passport');

const authenticated = require('../../middlewares/authenticated');

router.route('/')
  .get((...args) => controller.find(...args))
  .post(authenticated, (...args) => controller.create(...args));

router.route('/:id')
  .put(authenticated, (...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete(authenticated, (...args) => controller.remove(...args));

module.exports = router;
