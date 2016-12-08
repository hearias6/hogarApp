$(document).ready(function() {

  $('.link-reporte-ingreso').click(reporteIngresos);
  $('.link-reporte-gasto').click(reporteGastos);

  function reporteIngresos(e) {
    e.preventDefault();
    console.log('reporte1.');

    $.ajax({
      url: 'http://localhost:4040/app/reporte/reportesIngresos',
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


  function reporteGastos(e) {
    e.preventDefault();
    console.log('en.. reportesGastos..');
    $.ajax({
      url: 'http://localhost:4040/app/reporte/reportesGastos',
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
