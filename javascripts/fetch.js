var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var fetch = (type, query, callback) => {
  //callback(result) - passing results as object to hbs (iteration!)
  //all - should put all documents in one object and pass them to hbs
  //byId - should search by id and pass to hbs
  //content - should search all string-type properties (title, content, keywords)

  //********* FETCHING ALL NOTES *********
  if(type=='all') {
    Note.find({})
    .then(
      (result)=> {
        callback(result);
      })
    .catch(
      (error) => {
        console.log(`******Error reading database:\n${error}\n******End of error message`);
        callback(error)
    });
  };

  //********* SEARCHING BY PROVIDED TEXT IN TITLE, CONTENT AND KEYWORDS *********
  if(type=='text') {};

  //********* SEARCHING FOR KEYWORDS *********
  if(type=='keywords') {
    var documents = [];
    Note.find({keywords: {"$regex": query}})
    .then(
      (result) => {
        for (let i of result) {
          documents.push(i);
        };
        callback(documents);
      }
    )
    .catch(
      (error) => {
        return console.log(error);
      }
    );
  };


  //********* SEARCHING BY ID *********
  if(type=='id') {
    Note.findById(query)
    .then(
      (result) => {
        callback(result)
      }
    )
    .catch(
      (error) => {
        console.log(error);
        callback(error)
      }
    );
  };

};

module.exports = {fetch};
