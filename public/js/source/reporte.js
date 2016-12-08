$(document).ready(function() {

  $('.link-reporte-ingreso').click(reporte1);

  function reporte1(e) {
    e.preventDefault();
    console.log('reporte1.');

    $.ajax({
      url: 'http://localhost:4040/app/reporte/reportes',
      type: 'get',
      dataType: 'json',
      data: {param1: 'value1'}
    })
    .done(function(respuesta) {
      console.log("respuesta: " + respuesta.respuesta);
      console.log("mensaje: " + respuesta.mensaje);

      if (respuesta.respuesta == 'success') {
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

  }

});
