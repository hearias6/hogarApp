$(document).ready(function() {

  $('.btnEditarIngreso').click(editar);

  function editar(e) {
    e.preventDefault();
    console.log('diste click en btnEditarIngreso');

    var datos = $(this).parent().parent().serialize();
    console.log('datos: '+ datos);

    $.ajax({
      url: 'http://localhost:4040/app/editar',
      type: 'POST',
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

});
