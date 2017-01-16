const {mongoose} = require('./server/db/mongoose');
const {noteModel} = require('./server/models/note');

// mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));

var create = (newNoteTitle,newNoteContent,newNoteKeywords, callback) => {
  var newDocument = new noteModel({title: newNoteTitle, content: newNoteContent, keywords: newNoteKeywords});

  newDocument.save().then((document)=>{
    callback(document,undefined);
  },(error)=>{
    callback(undefined,error);
  });
}
//*************************************************************************
module.exports = {create};
