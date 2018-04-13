const Router = require('express').Router;
const router = new Router();


const page = require('./api/page/router');
const post = require('./api/post/router');
const user = require('./api/user/router');
const upload = require('./api/upload/router');
const auth = require('./api/auth/router');

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to website-api API!'
  });
});

router.use('/page', page);
router.use('/posts', post);
router.use('/users', user);
router.use('/upload', upload);
router.use('/auth', auth);

module.exports = router;
