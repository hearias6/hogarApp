$(document).ready(function() {

  // conectar el cliente a un socket.
  var url = 'http://localhost:4040';
  var socket = io.connect(url, { 'forceNew': true }  );

  $('#btnMensaje').click(enviarMsj);

  // cuando se oprime el boton << enviar mensaje >>
  function enviarMsj(){

      var usuario = $('#usuario').val();
      var mensaje = $('#mensaje').val();
      console.log('usuario: ' + usuario + ' mensaje: '+  mensaje);
      var msj = { user: usuario, chat: mensaje };

      // guardar en la base de datos..
      $.ajax({
        url: 'http://localhost:4040/app/chat/guardarMensaje',
        type: 'POST',
        dataType: 'JSON',
        data: msj
      })
      .done(function(respuesta) {
        console.log("respuesta " + respuesta.resultado);
        console.log("mensaje " + respuesta.mensaje);

        if (respuesta.resultado == 'success') {
          console.log('proceder con el socket..');
          // enviar un mensaje al servidor.
          socket.emit('cliente-msj',msj);
        }
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });

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
