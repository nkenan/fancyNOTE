var {mongoose} = require('./database/mongoose');
var {Note} = require('./models/Note');

var newNote = (ancistor, owners, editors, publicNote, title, content, keywords, callback) => {
  var note = new Note({
    ancistor: ancistor,
    owners: owners,
    editors: editors,
    publicNote: publicNote,
    title: title,
    content: content,
    keywords: keywords
  });
  note.save().then((document) => {
    callback(undefined,document);
  },(error)=>{
    callback(error,undefined);
  });
};

newNote(undefined, undefined, undefined, true, 'Das geht doch nicht', 'Eigentlich geht alles', undefined, (error,document) => {
  if(error) console.log(error);
  if (document) console.log(document);
  console.log('Finished.');
});
newNote(undefined, undefined, undefined, false, 'Sieht gar nicht so verkehrt aus', 'Es wird alles nur noch schlimmer.', undefined, (error,document) => {
  if(error) console.log(error);
  if(document) console.log(document);
  console.log('Finished.');
});
newNote(undefined, undefined, undefined, true, 'Doch das Wasser floß weiter', 'Wüsste man es nicht besser, würde man etwas total schreckliches annehmen.', undefined, (error,document) => {
  if(error) console.log(error);
  if(document) console.log(document);
  console.log('Finished.');
});
newNote(undefined, undefined, undefined, false, 'Ferdinand hatte riesige Probleme', 'Niemand wusste so recht, wie er da wieder herauskommen sollte.', undefined, (error,document) => {
  if(error) console.log(error);
  if(document) console.log(document);
  console.log('Finished.');
});
