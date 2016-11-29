$(document).ready(function() {

  $('.btnEditarPerfil').click(editar);
  $('.btnCambiarClave').click(cambiarClave);
  $('.buttonPerfil').click(cambiarFoto);

  function editar(e) {

    e.preventDefault();
    console.log('editar en perfil.');

    var datos = $(this).parent().parent().serialize() ;
    console.log('datos: ' + datos);

    $.ajax({
      url: 'http://localhost:4040/app/perfil/actualizar',
      type: 'put',
      dataType: 'json',
      data: datos
    })
    .done(function(respuesta) {
      console.log("respuesta: " + respuesta.resultado);
      if (respuesta.resultado == 'success') {
        $('.success').removeClass('hidden');
        $('.error').addClass('hidden');
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  };

  function cambiarClave(e) {
      e.preventDefault();
      console.log('cambiar clave');
      var datos = $(this).parent().parent().serialize();
      console.log('datos: ' + datos);

      $.ajax({
        url: 'http://localhost:4040/app/perfil/cambiarClave',
        type: 'put',
        dataType: 'json',
        data: datos
      })
      .done(function(respuesta) {
        console.log("respuesta " + respuesta.resultado);
        console.log("mensaje " + respuesta.mensaje);
        if (respuesta.resultado == 'success') {
          $('.success').removeClass('hidden');
          $('.error').addClass('hidden');
          $('.success > .mensaje').text(respuesta.mensaje);
        }else{
          $('.success').addClass('hidden');
          $('.error').removeClass('hidden');
          $('.error > .mensaje').text(respuesta.mensaje);
        }
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });

  } // end cambiarClave

  function cambiarFoto(e) {
    e.preventDefault();
    var datos = $(this).parent().parent().serialize();
    console.log('datos: ' + datos);

    $.ajax({
      url: 'http://localhost:4040/app/perfil/foto',
      type: 'post',
      dataType: 'json',
      data: datos
    })
    .done(function(resultado) {
      console.log("resultado: " + resultado.resultado);
      console.log("mensaje: " + resultado.mensaje);

      if (resultado.resultado == 'success') {
        $('.success').removeClass('hidden');
        $('.error').addClass('hidden');
        $('.success .mensaje').text(resultado.mensaje);
      } else {
        $('.error').removeClass('hidden');
        $('.success').addClass('hidden');
        $('.error .mensaje').text(resultado.mensaje);
      }

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  }


});
