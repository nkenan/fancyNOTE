const {mongoose} = require('./../db/mongoose');
var Schema = mongoose.Schema;

var noteSchema = mongoose.Schema({
  title: String,
  content: String,
  keywords: {type: [String], trim: true},
  created: {type: Date, default: new Date }
  // changes: [{date: Date, user: Schema.ObjectId}],
  // author: Schema.ObjectId,
  // coauthors: [Schema.ObjectId],
});

var noteModel = mongoose.model('Note', noteSchema);
module.exports = {noteModel}
