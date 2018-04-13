const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const authenticated = require('../../middlewares/authenticated');


router.route('/')
  .get(authenticated, (...args) => controller.find(...args))
  .post(authenticated, (...args) => controller.create(...args));

router.route('/:id', authenticated)
  .put(authenticated, (...args) => controller.update(...args))
  .get(authenticated, (...args) => controller.findById(...args))
  .delete(authenticated, (...args) => controller.remove(...args));

module.exports = router;
