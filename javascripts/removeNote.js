var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var removeNote = (id, callback) => {
    Note.findByIdAndRemove(id, (error,document) => {
      if(error) return console.log(error);
      callback(undefined,document)
    });
};

module.exports = {removeNote};
