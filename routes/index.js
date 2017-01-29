var express = require('express');
var router = express.Router();

var {fetch} = require('./../javascripts/fetch');
var {createNote} = require('./../javascripts/createNote');
var {updateNote} = require('./../javascripts/updateNote');
var {removeNote} = require('./../javascripts/removeNote');
var {createUser} = require('./../javascripts/createUser');

router.get('/', function(req, res, next) {
  res.render('landingPage');
  //res.redirect('/notes');
});

/**** CREATE NEW USER *****/
router.post('/user', (req, res) => {
  createUser(req.body.email,req.body.password).then(
    (result)=>{
      return res.redirect('/notes');
    },
    (error)=>
    {
      return res.render('landingPage', {error: true});;
    });
});

/**** CREATE SINGLE NOTE *****/
router.get('/create', (req, res, next) => {
  res.render('note', {title: 'Create a new note', create: true});
});
router.post('/create', (req, res, next) => {
  createNote(req.body.owners,req.body.editors,req.body.publicNote,req.body.title,req.body.content,req.body.keywords.split(','), (error,result)=> {
    if(error) {
      return res.render('error', {error});
    };
    return res.redirect('/notes');
  });
});
/**** VIEW SINGLE NOTE *****/
router.get('/notes/:id' , (req,res,next) => {
  fetch('id', req.params.id, (note) => {
    res.render('note', {note: note, view: true});
  });
});
/**** LIST ALL NOTES *****/
router.get('/notes', (req, res, next) => {
  fetch('all', undefined, (notes) => {
    return res.render('notes', {title: 'My notes', notes: notes});
  });
});
/**** EDIT SINGLE NOTE *****/
router.get('/notes/:id/edit', (req,res,next) => {
  fetch('id', req.params.id, (note) => {
    res.render('note', {title: 'Edit your note', note: note, edit: true});
  });
});
router.post('/notes/:id', (req,res,next) => {
  updateNote(req.params.id,req.body.owners,req.body.editors,req.body.publicNote,req.body.title,req.body.content,req.body.keywords.split(','),req.body.created, (error,document) => {
    if(error) return console.log('ERROR');
    return res.redirect(`/notes/${req.params.id}`);
  });
});
/**** REMOVE SINGLE NOTES *****/
router.get('/notes/:id/remove', (req, res, next) => {
  removeNote(req.params.id, (error,document) => {
    return res.redirect('/notes');
  });
});
/**** SEARCH FOR NOTES *****/
router.post('/search', (req, res, next) => {
  fetch('text', req.body.query, (notes) => {
    return res.render('notes', {title: 'Results for "' + req.body.query + '"', notes: notes});
  });
});

/**** SEARCH FOR KEYWORDS *****/
router.get('/keywords/:id', (req, res, next) => {
  fetch('keywords', req.params.id, (notes) => {
    return res.render('notes', {title: 'Keyword \"' + req.params.id + '\"', notes: notes});
  });
});

/**** CUSTOMER AND ADMINISTRATIVE ROUTES *****/
router.get('/help', (req, res, next) => {
  res.render('index', {title: 'Help fancyNOTE to have better help', content: 'Please click here.'});
});


module.exports = router;
