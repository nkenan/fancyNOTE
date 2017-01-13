var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();


var {createNote} = require('./../create');
var {findNote} = require('./../find');
//********** ALL THE ROUTES ARE BELOW
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
//********** LIST NOTES
router.get('/notes', (req, res, next) => {
  res.render('notes', {title: 'My notes', content: 'This will be a listing of all my notes.'});
});
//********** CREATE
router.get('/create', (req, res, next) => {
  res.render('create', {title: 'Create new note'});
});
router.post('/create', (req, res, next) => {
  var newNoteTitle = req.body.newNoteTitle;
  var newNoteContent = req.body.newNoteContent;
  createNote(newNoteTitle, newNoteContent, (document,error) =>{
    if(error) {
      console.log(`${error}`);
      return res.render('index', {title: 'Error',content: error});
    };
    res.render('index', {title: newNoteTitle,content: newNoteContent});
  });
});
//********** FIND
router.get('/find', (req, res, next) => {
  res.render('find', {title: 'Search your notes'});
});
router.post('/find', (req, res, next) => {
  //console.log(`$req.body.noteTitle=${req.body.noteTitle}`);
  if (req.body.noteTitle) var noteTitle = req.body.noteTitle;
  if (req.body.noteContent) var noteContent = req.body.noteContent;  
  console.log(`$noteTitle: ${noteTitle}`);
  console.log(`$noteContent: ${noteContent}`);
  findNote(noteTitle, noteContent, (document,error) =>{
    if(error) {
      return res.render('index', {title: 'Could not find your note', content: error});
    };
    res.render('index', {title: document.title, content: document.content});
  });
});
//********** HAPPY ENDING
module.exports = router;
