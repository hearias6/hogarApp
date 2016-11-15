$(document).ready(function() {

  $('.close').click(closeMsj);

  function closeMsj() {
    console.log('cerrar');
    $(this).parent().addClass('hidden');
  }

});
