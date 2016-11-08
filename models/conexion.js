var mysql = require('mysql');
var config = require('../config/database');

//var db = mysql.createConnection(config);

// retornar db.

var Conexion = {}
Conexion.conectar = mysql.createConnection(config);
module.exports = Conexion;
