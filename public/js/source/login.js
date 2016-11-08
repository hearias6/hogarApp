$(document).ready(function() {

   $('#btnLogin').click(login);

   function login(e) {

     e.preventDefault();

      var email = $('#email').val();
      var pass = $('#contrasena').val();
      console.log('email: ' + email + ' pass: ' + pass);

      $.ajax({
        url: 'http://localhost:4040/',
        type: 'post',
        dataType: 'json',
        data: {email: email, contrasena: pass}
      })
      .done(function(data) {
        console.log("success");
        console.log(data.resultado);
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });

   }


})
