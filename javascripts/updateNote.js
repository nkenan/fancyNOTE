var {mongoose} = require('./../database/mongoose');
var {Note} = require('./../models/Note');

var updateNote = (id, owners, editors, publicNote, title, content, keywords, callback) => {
  Note.findOneAndUpdate({_id: id}, {$set: {owners:owners, editors:editors, publicNote:publicNote, title:title, content:content, keywords:keywords}}, (error,document)=> {
    if(error) callback(error,undefined);
    if(document) callback(undefined,document);
  });
};
module.exports = {updateNote};
