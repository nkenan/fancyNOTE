var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var create = (newTitle, newContent, newKeywords, callback) => {
  var newNote = new Note({title: newTitle, content: newContent, keywords: newKeywords});

  newNote.save().then((document)=>{
    console.log('HIER');
    callback(undefined,document);
  },(error)=>{
    console.log('DORT');
    callback(error,undefined);
  });
}

module.exports = {create};
