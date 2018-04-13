const User = require('./facade');

User.model.findOne({
  email: 'clough.warren@gmail.com'
}).then((user) => {
  if (!user) {
    User.create({
      first_name: 'Warren',
      last_name: 'Clough',
      email: 'clough.warren@gmail.com',
      password: 'password',
      type: 'admin'
    });
  }
});
