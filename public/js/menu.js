$(document).ready(function() {

  var abrirMenu = false;

  $('.menu-bar').click(function() {

    if (abrirMenu) {
      $('.menu').css({"display":"block"})
      console.log('abrir Menu');
      abrirMenu = false;
    } else {
      $('.menu').css({"display":"none"})
      console.log('Cerrar Menu');
      abrirMenu = true;
    }
  })
});
