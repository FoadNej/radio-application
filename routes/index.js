var express = require('express');
var router = express.Router();


var io = require("socket.io")();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});


router.get('/joysticksample', function(req, res, next) {
  res.render('joysticksample.html', { title: 'Express' });
});
router.get('/wheelsample', function(req, res, next) {
  res.render('wheelsample.html', { title: 'Express' });
});

router.get('/whack', function(req, res, next) {
  res.render('whack.html', { title: 'Express' });
});

router.get('/whackm', function(req, res, next) {
  res.render('whackm.html', { title: 'Express' });
});

router.get('/drum', function(req, res, next) {
  res.render('drum.html');
});

router.get('/slider', function(req, res, next) {
  res.render('slider.html', { title: 'Express' });
});


router.get('/nav', function(req, res, next) {
  console.log(req);
  res.render('nav.html', { source: req.query.vid });
});

router.get('/radio', function(req, res, next) {
  console.log(req);
  res.render('vr.html');
});

router.get('/recom', function(req, res, next) {
  res.render('recom.html');
});

router.get('/game', function(req, res, next) {
  res.render('index.ejs', { title: 'Express' });
});

router.get('/slot', function(req, res, next) {
  res.render('slot.html', { title: 'Express' });
});

router.get('/wifisetup', function(req, res, next) {
  res.render('wifisetup.html', { title: 'Express' });
});

router.get('/sound', function(req, res, next) {
  res.render('sound.html', { title: 'Express' });
});

router.get('/painting', function (req, res) {
    res.render('index',{});
});

router.get('/ds', function(req, res, next) {
  res.render('ds.html');
});

router.get('/peddler', function(req, res, next) {
  res.render('peddler.html');
});

router.get('/player', function(req, res) {
  //console.log(req);
  var src = 'https://www.youtube.com/embed/' + req.query.vid +'?autoplay=1';
  req.io.to('recom').emit('recom suggest', { vid: src , chatroom: 'recom'});
  res.json({res: "puch"});
});


module.exports = router;
