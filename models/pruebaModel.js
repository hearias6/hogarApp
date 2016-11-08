var Prueba = {};

Prueba.mensaje = 'Hola esto es una prueba';

Prueba.mostrarMensaje = function() {
  console.log('Mostrar Mensaje desde el modelo');
}

Prueba.recibirParametro = function(Nombre) {
  console.log('Hola : ' + Nombre);
}

module.exports = Prueba;
