var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var fetch = (query, callback) => {
  //callback(result) - passing results as object to hbs (iteration!)
  //all - should put all documents in one object and pass them to hbs
  //byId - should search by id and pass to hbs
  //content - should search all string-type properties (title, content, keywords)

  if(query=='all') {
    Note.find({}, (error,result)=> {
      console.log(result);
      callback(result);
    });
  } else {
    var fetchedIds = [];
    var documentIds = [];
    // find content, title and keywords
    Note.find({title: query}, (error,result) => {
      if(result != 'null') {
        fetchedIds = Object.assign({}, fetchedIds[0], result);
        documentIds.push(fetchedIds[0]);
      }
    });
    Note.find({content: query}, (error,result) => {
      if(result != 'null') {
        fetchedIds = Object.assign({}, fetchedIds[0], result);
        documentIds.push(fetchedIds[0]);
      }
    });
    Note.find({keywords: query}, (error,result) => {
      if(result != 'null') {
        fetchedIds = Object.assign({}, fetchedIds[0], result);
        documentIds.push(fetchedIds[0]);
        console.log('typeof: ',typeof documentIds,' - value: ',documentIds);
        callback(documentIds);
      }
    });

}};

module.exports = {fetch};
