var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//Riyuchi

var fs = require('fs');
var mkdirp = require("mkdirp");
var base64 = require('urlsafe-base64');
var getDirName = require("path").dirname


var present_route = '';

function writeFile (path, contents, cb) {
  console.log("Save image to DB");
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err)
      fs.writeFile(path, contents, cb);
  })
}





//added for express generator socketio
var io = require("socket.io")();
app.io = io;

//event management
io.on('connection', function(socket){

  io.clients(function(error, clients){
    if (error) throw error;
    console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
  });


  socket.on('home load', function(data){
    socket.join(data.room);
    console.log(data.room);
    console.log('joined home room');

  });








  socket.on('disconnect', function(){
    console.log('disconnected');
  });


 








socket.on('wheel start', function(data){
    socket.join(data.chatroom);
    console.log('joined');

  });

 socket.on('wheel left', function(data){
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('wheel left', { sliderPos: data.sliderPos });
    console.log(data);
    

  });

 socket.on('wheel right', function(data){
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('wheel right', { sliderPos: data.sliderPos });
    console.log(data);
   
   
  });








});










var engines = require('consolidate');

app.engine('ejs', engines.ejs);
app.engine('html', require('ejs').renderFile);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//IMPORTANT GOLD SOLUTION for using socket in REST router
app.use(function(req, res, next) {
  req.io = io;
  next();
 
});



app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

var exec = require('child_process').exec;
app.post('/api/configurewifi', function(req, res) {
    var ssid = req.body.ssid;
    var pass = req.body.pass;
    console.log(ssid);
    var cmd = 'ifconfig';
    exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
    });

    console.log("resid be post");
    res.send(ssid + ' ' + pass + ' ');
});


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
