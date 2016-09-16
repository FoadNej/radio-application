var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

router.get('/game', function(req, res, next) {
  res.render('index.ejs', { title: 'Express' });
});

router.get('/slot', function(req, res, next) {
  res.render('slot.html', { title: 'Express' });
});
router.get('/sound', function(req, res, next) {
  res.render('sound.html', { title: 'Express' });
});
module.exports = router;
