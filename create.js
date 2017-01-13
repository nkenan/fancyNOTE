const {mongoose} = require('./server/db/mongoose');
const {noteModel} = require('./server/models/note');

// mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));

var createNote = (newNoteTitle,newNoteContent, callback) => {
  var newDocument = new noteModel({title: newNoteTitle, content: newNoteContent});

  newDocument.save().then((document)=>{
    console.log(`Document saved:\n${document}`);
    callback(document,undefined);
  },(error)=>{
    console.error(error);
    callback(undefined,error);
  });
}
//*************************************************************************
module.exports = {createNote};

//DEBUG
// createNote('Hallo','Das ist ein neuer Text.', (document, error) => {
//   if (error) return console.log(`DEBUG: $error: ${error}`);
//   console.log(`DEBUG: $document: ${document}`);
// });
//END OF DEBUG
