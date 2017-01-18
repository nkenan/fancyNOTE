var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var fetch = (query, callback) => {
  //callback(result) - passing results as object to hbs (iteration!)
  //all - should put all documents in one object and pass them to hbs
  //byId - should search by id and pass to hbs
  //content - should search all string-type properties (title, content, keywords)

  if(query=='all') {
    Note.find({}, (error,result)=> {
      callback(result);
    });
  } else {
    var fetchedIds = [];
    var documentIds = [];

    var temp;
    // find content, title and keywords
    Note.find({title: {"$regex": query}}, (error,result) => {
      if(result != "") {
        console.log(`**********************\nerror: ${error}\nresult: ${result}\n**********************`);
        fetchedIds = Object.assign({}, fetchedIds[0], result);
        documentIds.push(fetchedIds[0]);
      };
    });
    Note.find({content: {"$regex": query}}, (error,result) => {
      if(result != "") {
        console.log(`**********************\nerror: ${error}\nresult: ${result}\n**********************`);
        fetchedIds = Object.assign({}, fetchedIds[0], result);
        documentIds.push(fetchedIds[0]);
      };
    });
    Note.find({keywords: {"$regex": query}}, (error,result) => {
      if(result != "") {
        console.log(`**********************\nerror: ${error}\nresult: ${result}\n**********************`);
        fetchedIds = Object.assign({}, fetchedIds[0], result);
        documentIds.push(fetchedIds[0]);
      };
      callback(documentIds);
    });

  }};

module.exports = {fetch};
