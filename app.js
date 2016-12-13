
// server.
var express = require('express');
var app = express();
var port = 4040;
var path = require('path');

// librerias - server.
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server); // socket.

var chat = []; // arreglo para guardar los mensajes del chat.

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
var session = require('express-session');
var config = require('./config/session');
app.use(session(config));

// archivos estaticos
app.use('/web',express.static(path.join(__dirname, 'public')));

// rutas de la pagina.
var login = require('./routes/login');
var ingreso = require('./routes/ingresos');
var gasto = require('./routes/gastos');
var perfil = require('./routes/perfil');
var estadistica = require('./routes/estadistica');
var reporte = require('./routes/reportes');

app.use('/', login);
app.use('/app', ingreso);
app.use('/app/gastos', gasto);
app.use('/app/perfil', perfil);
app.use('/app/estadistica',estadistica);
app.use('/app/reporte',reporte);


// ---------------------------------- CHAT -----------------------------------
// sockets.
// on --> receptor, espera un evento del otro programa que lo inicia (cliente)
// emit --> emisor, envia un evento a otro programa (cliente)
// esperando la conexion...

// vista.
var chatView = require('./routes/chat');
app.use('/app/chat', chatView);


// socket - server.
io.on('connection',function(socket){
    console.log('un cliente se ha conectado...');
    // receptor -- Esperando a que un cliente envie un mensaje..
    socket.on('cliente-msj', function(msj) {
        // agregar en el arreglo el mensaje que envia el usuario.
        chat.push(msj);
        //envia el mensaje enviado de un cliente a los demas
        io.sockets.emit('server-msj', chat);
    });
});


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

// manejo de errores.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('otros/error', {
    message: err.message,
    error: {}
  });
});

// run server
server.listen(port,function(){
    console.log('run server http://localhost:'+port);
});
