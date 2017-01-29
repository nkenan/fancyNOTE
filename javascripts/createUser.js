const {mongoose} = require('./../database/mongoose');
const {User} = require('./../models/User');

var createUser = (email, password, callback) => {
  return new Promise ((resolve,reject) => {
    var user = new User({email,password});
    user.save().then((document) => {
      console.log(`SAVING NEW USER: ${email}`);
      resolve(undefined,document);
    },(error)=>{
      console.log(`ERROR SAVING NEW USER: ${email}`);
      reject(error,undefined);
    });
  });
};

module.exports = {createUser};
