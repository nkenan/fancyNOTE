var express = require('express');
var router = express.Router();

var {create} = require('./../javascripts/create');
var {fetch} = require('./../javascripts/fetch');


/* GET home page. */

router.post('/search', (req, res, next) => {
  fetch(req.body.query, (notes) => {
    return res.render('notes', {title: `Results for: ${req.body.query}`, notes});
  });
});

router.get('/notes', (req, res, next) => {
  fetch('all', (notes) => {
    return res.render('notes', {title: 'My notes', notes});
  });
});

router.post('/create', (req, res, next) => {
  console.log(req.body.title,req.body.content,req.body.keywords);
  create(req.body.title,req.body.content,req.body.keywords.split(','), (error,result)=> {
    if(error) {
      return res.render('error', {error});
    };
    return res.redirect('notes');
  });
});
router.get('/create', (req, res, next) => {
  res.render('create');
});

router.get('/', function(req, res, next) {
  res.redirect('/notes');
});

module.exports = router;
