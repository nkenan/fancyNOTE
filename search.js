const {mongoose} = require('./server/db/mongoose');
const {noteModel} = require('./server/models/note');

var list = (callback) => {
  noteModel.find({}, (error,result) => {
    if(error) {
      callback(error);
    }
    else {
      callback(result);
    };
  });
};

var search = (queryProperty,queryContent,callback) => {
  if(!queryProperty) {
    queryProperty='title';
  }
  if(queryProperty=='title') {
    noteModel.findOne({title: queryContent}, 'title content', (error,result) => {
      if(!result) {
        return callback(result);
      }
      else {
        return callback(result);
      };
    });
  };
  if(queryProperty=='_id') {
    noteModel.findById(queryContent, (error,result) => {
      if(!result) {
        return callback(result)
      } else {
        return callback(result)
      }
    });
  };
};

//DEBUG
//END OF DEBUG

module.exports = {
  search,
  list
}
