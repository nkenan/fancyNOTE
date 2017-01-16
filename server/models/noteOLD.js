const {mongoose} = require('./../db/mongoose');

var Schema = mongoose.Schema;

var noteSchema = mongoose.Schema({
  title: String,
  content: String
});

var noteModel = mongoose.model('Note', noteSchema);

module.exports = {noteModel}
