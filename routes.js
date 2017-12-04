const Router = require('express').Router;
const router = new Router();

const page = require('./model/page/router');
const homepage = require('./model/homepage/router');
const post = require('./model/post/router');
const user = require('./model/user/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to website-api API!' });
});

router.use('/page', page);
router.use('/homepage', homepage);
router.use('/post', post);
router.use('/user', user);

module.exports = router;
