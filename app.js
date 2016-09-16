var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


//added for express generator socketio
var io = require("socket.io")();
app.io = io;

//event management
io.on('connection', function(socket){

  io.clients(function(error, clients){
    if (error) throw error;
    console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
  });
  //
  //socket.emit('rasp connect', { some: 'data' });
  //console.log('connected');
  //raspberry introduces itself, and is joined to a room with its id
  socket.on('slot load', function(data){
    socket.join(data.raspID);
    console.log(data.raspID);
    console.log('joined');

  });


  //event received from browser, and send to the room with the raspID (obtained from database)
  socket.on('lever down', function(data){
    console.log(data);
    console.log(data.raspID);
    socket.join(data.raspID);
    io.to(data.raspID).emit('spin', { strength: data.strength });
    //socket.broadcast.to(data.raspID).emit("boro",data);

  });


//event received from raspberry(console log), and send to the browser, this needs to be optimized
  socket.on('log', function(data){
    console.log(data);
    console.log(data.raspID);
    socket.join(data.raspID);
    io.to(data.raspID).emit('update log', { log: data.log });
    //socket.broadcast.to(data.raspID).emit("boro",data);

  });


  socket.on('disconnect', function(){
    console.log('disconnected');
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
