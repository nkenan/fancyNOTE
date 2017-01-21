const {mongoose} = require('./../database/mongoose')

//DEFINING SCHEMA AND CREATING MODEL OF IT
var note = new mongoose.Schema({
  title: {type: String, trim: true},
  content: {type: String, trim: true},
  keywords: {type: [String], trim: true},
  created: { date: { type: Date, default: new Date, required: true}},
  // changed: { date: {type: Date, default: null}, by: {type: mongoose.Schema.ObjectId, required: true}, oldDocument: [Object] }
});
var Note = mongoose.model('Note', note);

module.exports = {Note};
