var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/customerRouter');
var manufacturerRouter = require('./routes/manufacturerRouter');
var salesRouter = require('./routes/salesRouter');
var logistian1Router = require('./routes/logistian1Router');
var logistian2Router = require('./routes/logistian2Router');
var logistian3Router = require('./routes/logistian3Router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由配置
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/query', customerRouter); //revised
app.use('/register', manufacturerRouter); //revised
app.use('/sales_succ', salesRouter); //revised
app.use('/logistian1', logistian1Router); //ok
app.use('/logistian2', logistian2Router); //ok
app.use('/logistian3', logistian3Router); //ok

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
