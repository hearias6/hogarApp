$(document).ready(function() {

  // conectar el cliente a un socket.
  var url = 'http://localhost:4040';
  var socket = io.connect(url, { 'forceNew': true }  );

  //
  $('#btnMensaje').click(enviarMsj);

  // cuando se oprime el boton << enviar mensaje >>
  function enviarMsj(){

      var usuario = $('#usuario').val();
      var mensaje = $('#mensaje').val();


      console.log('usuario: ' + usuario + ' mensaje: '+  mensaje);

      var msj = { user: usuario, chat: mensaje };

      // enviar un mensaje al servidor.
      socket.emit('cliente-msj',msj);
      return false;
  }

  // respuesta del servidor.
  socket.on('server-msj',function(datos){
      mostrarChat(datos);
      limpiarFormulario();
  })

  // funcion para mostrar todos los mensajes en pantalla.
  function mostrarChat(datos) {
    var html = datos.map(function(elem, index) {
      return(`<div>
                <strong>${elem.user}</strong>:
                <em> ${elem.chat}</em>
              </div>`);
    }).join(" ");

    document.getElementById('chat').innerHTML = html;
  }

  function limpiarFormulario(){
      document.getElementById('mensaje').value = '';
  }

});