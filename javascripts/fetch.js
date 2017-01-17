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
    var fetchedIds = {};
    // find content, title and keywords
    Note.find({title: query}, (error,result) => {
      Object.assign(fetchedIds, result);
      console.log(`fetchedIds after title: \n${JSON.stringify(fetchedIds)}`);

    });
    Note.find({content: query}, (error,result) => {
      Object.assign(fetchedIds, result);
      console.log(`fetchedIds after content: \n${JSON.stringify(fetchedIds)}`);

    });
    Note.find({keywords: query}, (error,result) => {
      Object.assign(fetchedIds, result);
      console.log(`fetchedIds after keywords: \n${JSON.stringify(fetchedIds)}`);

    });
    callback(fetchedIds);
}};

module.exports = {fetch};
