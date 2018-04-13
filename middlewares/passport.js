const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserModel = require('../api/user/facade');
const config = require('../config');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, cb) => {
  return UserModel.findOne({
      email
    })
    .then((user) => {

      if (!user) {
        return cb(null, false, {
          message: 'Incorrect email or password.'
        });
      }

      return user.comparePassword(password).then((isMatch) => {
        if (!isMatch) {
          return cb(null, false, {
            message: 'Incorrect email or password.'
          });
        }

        return cb(null, user, {
          message: 'Logged In Successfully'
        });
      }, (err) => {
        console.log(err);
        return cb(err);
      });
    })
    .catch(err => cb(err));
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
}, (jwtPayload, cb) => UserModel.findById(jwtPayload._id).then(user => cb(null, user)).catch(err => cb(err))));
