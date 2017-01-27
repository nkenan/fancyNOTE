var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var removeNote = (id, callback) => {
    Note.findByIdAndRemove(id).then((document) => {
      callback(undefined,document);
    },(error)=>{
      callback(error,undefined);
    });
};

module.exports = {removeNote};
