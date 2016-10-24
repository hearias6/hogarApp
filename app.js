// server.
var express = require('express');
var app = express();
var port = 4040;
var path = require('path');

// vista jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// logs
var logger = require('morgan');
app.use(logger('dev'));

// parametros
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookies y sessiones
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// archivos estaticos
app.use('/web',express.static(path.join(__dirname, 'public')));

// rutas de la pagian.
var login = require('./routes/login');
var users = require('./routes/users');
app.use('/', login);
app.use('/app', users);

// page no found 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// manejo de errores.
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('otros/error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('otros/error', {
    message: err.message,
    error: {}
  });
});

// run server.
app.listen(port,function(err) {
    if (err) {
      throw err;
    } else {
      console.log('run localhost:' + port);
    }
})
