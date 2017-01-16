const {mongoose} = require('./server/db/mongoose');
const {noteModel} = require('./server/models/note');

var list = (callback) => {
  noteModel.find({}, (error,result) => {
    if(error) {
      callback(result);
    }
    else {
      callback(result);
    };
  });
};

// list((result)=> {
//   if(!result) return console.log('ERROR!');
//   if(result) return console.log('DOCUMENTS: ', result);
// });

var search = (queryProperty,queryContent,callback) => {
  if(!queryProperty) {
    queryProperty='title'
  }
  if(queryProperty=='title') {
    console.log(`$queryContent: ${queryContent}\n$queryProperty: ${queryProperty}`);
    noteModel.findOne({title: queryContent}, 'title content', (error,result) => {
      if(error) {
        return callback(error,undefined);
      }
      else {
        return callback(undefined,result);
      };
    });
  };
  if(queryProperty=='content') {
    noteModel.findOne({content: queryContent}, (error,result) => {
      if(error) {
        return callback(error);
      }
      else {
        return callback(result);
      };
    });
  };
  if(queryProperty=='author') {
    noteModel.findOne({author: queryContent}, (error,result) => {
      if(error) {
        return callback(error);
      }
      else {
        return callback(result);
      };
    });
  };
  if(queryProperty=='_id') {
    noteModel.findById(queryContent, (error,result) => {
      if(error) {
        return callback(error);
      }
      else {
        return callback(result);
      };
    });
  };

};

//DEBUG

// search('587a1ed142705554ab20dc1c','_id', (result) => {
//   if(!result) return console.log('Error');
//   console.log('Document: ', result);
// });

// noteModel.search({$text: {$search: 'sauer'}}).then((result)=>{
//     console.log(JSON.stringify(result));
//   }).catch((error)=>{
//     console.error(JSON.stringify(error));
//   });

//END OF DEBUG

module.exports = {
  search,
  list
}
