var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var fetch = (type, query, callback) => {
  console.log(query);
  var query = new RegExp(query, 'i');

  console.log(query);
  //callback(result) - passing results as object to hbs (iteration!)
  //all - should put all allResults in one object and pass them to hbs
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
        callback(error)
    });
  };

  //********* SEARCHING BY PROVIDED TEXT IN TITLE, CONTENT AND KEYWORDS *********
  if(type=='text') {
    var allResults = [];
    var newResults = [];

    Note.find({title: {"$regex": query}})
    .then(
      (result) => {
        if(result) {
          newResults = Object.assign({}, newResults[0], result);
          allResults.push(newResults[0]);
        };
        return Note.find({content: {"$regex": query}});
      }
    )
    .then(
      (result) => {
        if(result) {
          newResults = Object.assign({}, newResults[0], result);
          allResults.push(newResults[0]);
        };
        return Note.find({keywords: {"$regex": query}});
      }
    )
    .then(
      (result) => {
        if(result) {
          newResults = Object.assign({}, newResults[0], result);
          allResults.push(newResults[0]);
        };
        callback(allResults);
      }
    ).catch((error) => {
      callback(error)
    });
    //console.log(typeof allResults);
  };

  //********* SEARCHING FOR KEYWORDS *********
  if(type=='keywords') {
    var allResults = [];
    Note.find({keywords: {"$regex": query}})
    .then(
      (result) => {
        callback(result);
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
