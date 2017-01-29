const {mongoose} = require('./../database/mongoose');
const {User} = require('./../models/User');

var createUser = (email, password) => {
  return new Promise ((resolve,reject) => {
    var user = new User({email,password});
    user.save().then(
      (user) => {
      console.log(`CREATING NEW USER: ${email}`);
      return user.generateAuthToken();
      });
  });
};

module.exports = {createUser};
