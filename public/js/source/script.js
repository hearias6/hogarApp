$(document).ready(function() {

  $('.close').click(closeMsj);

  function closeMsj() {
    $(this).parent().addClass('hidden');
  }

});
