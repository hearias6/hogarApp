$(document).ready(function() {

  var abrirMenu = false;
  var abrirSubmenu = true;

  $('.menu-bar').click(function() {

    if (abrirMenu) {
      $('.menu-options').css({"display":"block"})
      console.log('abrir Menu');
      abrirMenu = false;
    } else {
      $('.menu-options').css({"display":"none"})
      console.log('Cerrar Menu');
      abrirMenu = true;
    }
  })


  $('.submenu').parent().click(submenu);

  function submenu(e) {

    console.log('submenu');

    var submenu = $(this).find('.submenu');



    if (abrirSubmenu) {
      submenu.removeClass('hidden');
      console.log('abrir submenu');
      abrirSubmenu = false;
    } else {
      submenu.addClass('hidden');
      console.log('cerrar submenu');
      abrirSubmenu = true;
    }

  }

});
