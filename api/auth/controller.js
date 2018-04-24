const Controller = require('../../lib/controller');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../config');

class AuthController extends Controller {
  login(req, res, next) {
    passport.authenticate('local', {
      session: false
    }, (err, user, info) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(400).json(info);
      }

      req.login(user, {
        session: false
      }, (err) => {
        if (err) {
          return next(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(this.getPayload(user), config.jwt.secret, {
          expiresIn: '1m'
        });

        const refresh_token = jwt.sign({
            user: {
              id: user.id
            },

          },
          config.jwt.refresh_secret, {
            expiresIn: '7d'
          }
        );

        return res.json({
          token,
          refresh_token
        });

      });
    })(req, res, next);
  }

  getPayload(user) {
    return {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      type: user.type
    };
  }
}

module.exports = new AuthController();
