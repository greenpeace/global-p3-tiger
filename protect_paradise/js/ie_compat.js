$(document).ready(function() {
  /* ------ IE specifics ----------------------- */

  // IE6 PNG fix
  if ($('html').hasClass('lt-ie7')) {
    DD_belatedPNG.fix('img, div.error, i, a, .section-raster-container, .logo, .png_bg');
  }

  // fallback: display labels in IE 6 + 7
  if ($('html').hasClass('lt-ie8')) {
    $('#UserEmail, #UserFirstname, #UserLastname').parent().find('label').each(function(){
      var text = $(this).text();
      $(this).text(text + ' *');
    });
  }
  // fallback for no supported css selector
  if ($('html').hasClass('lt-ie9')) {
    $(".celebrities li:nth-child(n+4)").hide();
  }
  // validation for >=IE9
  if ($('html').hasClass('lt-ie10')) {
    $('.select label, .text label').css({
      'display': 'block'
    });
  }
});
