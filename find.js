const {mongoose} = require('./server/db/mongoose');
const {noteModel} = require('./server/models/note');

var findNote = (noteTitle,noteContent, callback) => {
  if (noteTitle) {
    noteModel.findOne({'title': noteTitle}, 'title content').then((document)=>{
      console.log(`$*** 1 : document.title: ${document.title}`);
      callback(document,null);
    })
    .catch((error)=>{
        console.log(`$*** 1 : $error: ${error}`);
        callback(null,error);
      }
    );
  } else if (noteContent) {
    noteModel.findOne({'content': noteContent}, 'title content').then((document)=>{
      console.log(`$*** 2 : $document.content: ${document.content}`);
      callback(document,null);
    })
    .catch((error)=>{
      console.log(`$error: ${error}`);
      callback(null,error);
    });
  }
}
//*************************************************************************
module.exports = {findNote};

// DEBUG: can be delted
//findNote('Hallo', undefined, );
//END OF DEBUG
