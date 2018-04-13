const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    required: true,
    type: String,
    index: {
      unique: true
    }
  },
  type: {
    required: true,
    type: String
  },
  password: {
    type: String,
    required: true
  }
});


userSchema.pre('save', function (next) {
  const user = this;

  // only has the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    // has the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed on
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      return resolve(isMatch);
    });

  });

};


module.exports = userSchema;
