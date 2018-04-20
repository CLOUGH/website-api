const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/users')
  .get((...args) => controller.users(...args));
router.route('/page-views')
  .get((...args) => controller.pageViews(...args));
router.route('/page-views-per-day')
  .get((...args) => controller.pageViewsPerDay(...args));
router.route('/user-geolocation')
  .get((...args) => controller.getUserGeolocation(...args));


module.exports = router;
