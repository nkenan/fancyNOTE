
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();


var {create} = require('./../create');
var {search} = require('./../search');
var {list} = require('./../search');


//********** ALL THE ROUTES ARE BELOW
router.get('/', (req, res, next) => {
  // res.render('index', {title: 'My notes', content: 'This will be a listing of all my notes.'});
  res.redirect('/notes');
});
//********** LIST NOTES
router.get('/notes', (req, res, next) => {
  list((result)=> {
    if(result == "") return res.render('index', {title: 'No notes yet'});
    if(result) {
      return res.render('notes', {title: 'My notes', notes: result});}
  });
});
//********** CREATE
router.get('/create', (req, res, next) => {
  res.render('create');
});
router.post('/create', (req, res, next) => {
  var newNoteTitle = req.body.newNoteTitle;
  var newNoteContent = req.body.newNoteContent;
  var newNoteKeywords = req.body.newNoteKeywords.split(',');
  create(newNoteTitle, newNoteContent, newNoteKeywords, (document,error) =>{
    if(!document) {
      return res.render('index', {title: 'Error',content: result});
    } else {
      if (newNoteTitle == "" && newNoteContent == "" && newNoteKeywords == "") {
        return res.render('index', {title: 'No text input',content: 'Please provide title, content or keywords. You cannot save an empty note.'})
      };
      res.redirect('/notes');
    };
  });
});
//********** note
router.get('/note/:id', (req, res, next) => {
  search('_id', req.params.id, (result) => {
    if(result.name=="CastError") {
      res.redirect('/404')
    }
    if (result) {
      res.render('note', result)
    };
  });
});
//********** search
router.get('/search', (req, res, next)=> {
  res.redirect('/');

});
router.post('/search', (req, res, next) => {
  if(!req.body.queryProperty) {
    var queryProperty = 'title';
  } else {
    var queryProperty = req.body.queryProperty;
  }
  var queryContent = req.body.queryContent;
  search(queryProperty,queryContent, (result) =>{
    console.log('HALLO');
    if(!result) {
      return res.render('index', {title: 'Could not find your note'});
    } else {
    return res.redirect('/note/' + result._id);
    // return res.render('note', result);
    }
  });
});
//********** 404
router.get('/404', (req,res,next) => {
res.render('index', {title: 'Sorry for that', content: 'This note was not found. Maybe it was deleted or you do read rights.'})
}
);
//********** HAPPY ENDING
module.exports = router;
