$(document).ready(function() {

    console.log('cargando estadistica.js');

    sumaIngresos();
    sumaGastos();

    function sumaIngresos() {

      $.ajax({
        url: 'http://localhost:4040/app/estadistica/sumaIngresos',
        type: 'POST',
        dataType: 'json'
      })
      .done(function(resultado) {
        console.log("success");
        console.log('resultado: ' + resultado[0].suma);
        $('#ingreso').text(resultado[0].suma)
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
    }// end sumaIngresos().

    function sumaGastos() {

      $.ajax({
        url: 'http://localhost:4040/app/estadistica/sumaGastos',
        type: 'POST',
        dataType: 'json'
      })
      .done(function(resultado) {
        console.log("success");
        console.log('resultado: ' + resultado[0].suma);
        $('#gasto').text(resultado[0].suma)
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
    }// end sumaIngresos().



});
