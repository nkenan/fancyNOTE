const {mongoose} = require('./../database/mongoose')

//DEFINING SCHEMA AND CREATING MODEL OF IT
var note = new mongoose.Schema({
  title: {type: String, trim: true},
  content: {type: String, trim: true},
  keywords: {type: [String], trim: true},
  created: {type: Date, default: new Date}
});

var Note = mongoose.model('Note', note);

module.exports = {Note};
