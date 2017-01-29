var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var createNote = (owners, editors, publicNote, title, content, keywords, callback) => {
  return new Promise((resolve,reject) => {
    var note = new Note({
      owners: owners,
      editors: editors,
      publicNote: publicNote,
      title: title,
      content: content,
      keywords: keywords
    });
    note.save().then((document) => {
      resolve(undefined,document);
    },(error)=>{
      reject(error,undefined);
    });
  });
};

module.exports = {createNote};
