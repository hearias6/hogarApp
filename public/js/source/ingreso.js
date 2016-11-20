$(document).ready(function() {

  $('.btnEditarIngreso').click(editar);
  $('.buttonEliminarIngreso').click(eliminar);
  $('.btnNuevoIngreso').click(guardar);

  function editar(e) {
    e.preventDefault();
    console.log('diste click en btnEditarIngreso');

    var datos = $(this).parent().parent().serialize();
    console.log('datos: '+ datos);

    $.ajax({
      url: 'http://localhost:4040/app/editar',
      type: 'PUT',
      data: datos
    })
    .done(function(data) {
      console.log('respuesta en front end ' + data.resultado);
      if (data.resultado == 'success') {
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

  function eliminar(e) {
    e.preventDefault();
    var eliminar = $(this).parent();
    var id = eliminar.attr('id');
    console.log('id: ' + id);

    $.ajax({
      url: 'http://localhost:4040/app/eliminar',
      type: 'delete',
      dataType: 'json',
      data: {id: id}
    })
    .done(function(resultado) {
      console.log("resultado: " + resultado.resultado);
      if (resultado.resultado == 'success') {
        console.log('se ha eliminado con exito.');
        eliminar.parent().remove();
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  }

  function guardar(e) {
    e.preventDefault();
    var datos = $(this).parent().parent().serialize();
    console.log('datos: ' + datos);

    $.ajax({
      url: 'http://localhost:4040/app/guardar',
      type: 'post',
      dataType: 'json',
      data: datos
    })
    .done(function(resultado) {
      console.log("resultado: " + resultado.resultado);

      if (resultado.resultado == 'success') {
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

});
