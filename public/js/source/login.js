$(document).ready(function() {

   $('#btnLogin').click(login);

   function login(e) {

     e.preventDefault();

      var email = $('#email').val();
      var pass = $('#contrasena').val();
      console.log('email: ' + email + ' pass: ' + pass);

      $.ajax({
        url: 'http://localhost:4040',
        type: 'post',
        dataType: 'json',
        data: {email: email, contrasena: pass}
      })
      .done(function(data) {
        console.log(data.resultado);

        if (data.resultado == 'success') {
          //$('.success').removeClass('hidden');
          //$('.error').addClass('hidden');
          $(location).attr('href','http://localhost:4040/app');
        }

        if (data.resultado == 'no existe') {
          $('.success').addClass('hidden');
          $('.error').removeClass('hidden');
        }
      })
      .fail(function(error) {
        console.log("error: " + error );
      })
      .always(function() {
        console.log("complete");
      });

   }// end login


   $('#btnSignup').click(crearUsuario);

   function crearUsuario(e) {
     e.preventDefault();
     console.log('crear usuario');

     var datos = $(this).parent().parent().serialize();
     console.log('datos: '+ datos);

     $.ajax({
       url: 'http://localhost:4040/signup',
       type: 'post',
       dataType: 'json',
       data: datos
     })
     .done(function(resultado) {

       console.log('resultado: ' + resultado.resultado);
       console.log('mensaje: ' + resultado.mensaje);

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
     .fail(function(jqXHR, textStatus, errorThrown) {
       console.log("error");
       console.log('descripcion del error: ' + errorThrown);
       $('.error').removeClass('hidden');
       $('.success').addClass('hidden');
     })
     .always(function() {
       console.log("complete");
     });

     /*
     .fail(function (jqXHR, textStatus, errorThrown) {
         var defaultOption = 'US'
         selectDropdownByText('Id', defaultOption);

         console.log(errorThrown);
     */

   }


})
