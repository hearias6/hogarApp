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
       console.log("success");
       console.log('resultado: ' + resultado.resultado);
     })
     .fail(function() {
       console.log("error");
     })
     .always(function() {
       console.log("complete");
     });


   }


})
