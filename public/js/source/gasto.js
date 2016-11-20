$(document).ready(function() {

  console.log('cargando gasto.js');

  $('.btnNuevoGasto').click(registrar);
  $('.btnEditarGasto').click(actualizar);
  $('.buttonEliminarGasto').click(eliminar);

  $('.prueba').click(function(e) {
    e.preventDefault();
    console.log('prueba');
    $(this).parent().parent().remove();
  })

  function registrar(e) {
    e.preventDefault();
    console.log('registrar.');
    var datos = $(this).parent().parent().serialize();
    console.log('datos: ' + datos);

    $.ajax({
      url: 'http://localhost:4040/app/gastos/guardar',
      type: 'POST',
      dataType: 'JSON',
      data: datos
    })
    .done(function(respuesta) {
      console.log("respuesta: " + respuesta.respuesta);
      if ( respuesta.respuesta == 'success') {
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

  }

  function actualizar(e) {

    e.preventDefault();
    var datos = $(this).parent().parent().serialize();

    console.log('datos: ' + datos);

    $.ajax({
      url: 'http://localhost:4040/app/gastos/actualizar',
      type: 'put',
      dataType: 'json',
      data: datos
    })
    .done(function(respuesta) {

      console.log("respuesta: " + respuesta.respuesta);
      if ( respuesta.respuesta == 'success') {
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
  }// end actualizar

  function eliminar(e) {
    e.preventDefault();
    var etiqueta = $(this).parent();
    var id = etiqueta.attr('id');
    console.log('id: ' + id);

    $.ajax({
      url: 'http://localhost:4040/app/gastos/eliminar',
      type: 'delete',
      dataType: 'json',
      data: {id:id}
    })
    .done(function(respuesta) {
      console.log("respuesta: " + respuesta.resultado);
      if (respuesta.resultado === 'success') {
        console.log('se ha eliminado con exito..');
        etiqueta.parent().remove();
      } else {
        console.log('hay un error.');
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
