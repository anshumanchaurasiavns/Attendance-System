var createError = require('http-errors');
var express = require('express');
var path = require('path');
let bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
let cors = require('cors');
var userProgressRouter = require('./routes/userProgressRoute');
let batchRouter = require('./routes/batchRoute');
let userRouter = require('./routes/userRoute');

var app = express();
require('./config/mongoose').mongoose;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors())
// app.use(express.json());
// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

app.get("/",function(req,res){
  res.render("index");

});
app.use('/userProgress', userProgressRouter);
app.use('/batch', batchRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
