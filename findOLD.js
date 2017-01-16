const {mongoose} = require('./server/db/mongoose');
const {noteModel} = require('./server/models/note');

var find = (queryContent,queryProperty,callback) => {
  if(queryProperty=='title') {
    noteModel.findOne({title: queryContent}, (error,result) => {
      if(error) {
        return callback(error);
      }
      else {
        return callback(result);
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

// find('587a1ed142705554ab20dc1c','_id', (result) => {
//   if(!result) return console.log('Error');
//   console.log('Document: ', result);
// });

noteModel.find({$text: {$search: 'sauer'}}).then((result)=>{
    return console.log(result);
  }).catch((error)=>{
    return console.error(error);
  });

//END OF DEBUG

module.exports = {find}
