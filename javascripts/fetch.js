var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var fetch = (type, query, callback) => {
  //callback(result) - passing results as object to hbs (iteration!)
  //all - should put all documents in one object and pass them to hbs
  //byId - should search by id and pass to hbs
  //content - should search all string-type properties (title, content, keywords)

  if(type=='all') {
    Note.find({}, (error,result)=> {
      callback(result);
    }).sort({created: 1});
  };
  if(type=='text') {
    var fetchedIds = [];
    var documentIds = [];
    // find content, title and keywords
    Note.find({title: {"$regex": query}}, (error,result) => {
      if(result != "") {
        fetchedIds = Object.assign({}, fetchedIds[0], result);
        documentIds.push(fetchedIds[0]);
      };
    });
    Note.find({content: {"$regex": query}}, (error,result) => {
      if(result != "") {
        fetchedIds = Object.assign({}, fetchedIds[0], result);
        documentIds.push(fetchedIds[0]);
      };
    });
    Note.find({keywords: {"$regex": query}}, (error,result) => {
      if(result != "") {
        fetchedIds = Object.assign({}, fetchedIds[0], result);
        documentIds.push(fetchedIds[0]);
      };

    });
    console.log(JSON.stringify(documentIds[0]));
    callback(documentIds);

  };

  if(type=='id') {
    Note.findById(query, (error,result)=> {
      callback(result);
    });
  };
};

module.exports = {fetch};
