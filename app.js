var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var indexRestaurant = require('./routes/serviciosRestaurant');
var indexOrden = require('./routes/serviciosOrden');
var indexCliente = require('./routes/serviciosCliente');
var indexMenu = require('./routes/serviciosMenu');
var indexFactura = require('./routes/serviciosFactura');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/',indexRestaurant);
app.use('/',indexCliente);
app.use('/',indexOrden);
app.use('/',indexMenu);
app.use('/',indexFactura);

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

const port = 8000;
app.listen(port, () => {
console.log("running in " + port);
});


module.exports = app;
