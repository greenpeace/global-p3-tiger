// Avoid `console` errors in browsers that lack a console.
(function() {
  'use strict';
  var method,
  noop = function() {},
  methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'],
    l = methods.length,
    console = (window.console = window.console || {});

    while (l--) {
      method = methods[l];

      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
}());

$(document).ready(function(){

  // initialize form positioning, see below for further info
  fixFormPosition();

  // initialize parallax effect
  if (!$('html').hasClass('lt-ie7')) {
    $('#section-container1').parallax("50%", 0.1);
    $('#section-container2').parallax("50%", 0.2);
    $('#section-container3').parallax("50%", 0.1);
  }

  // celebrities carousel
  var i = 3;
  var j = 0;
  var max = $(".celebrities li").size();

  $("#js-show-more").click(function(){
    if(i<max) i++; else i = 1;
    if(j<max) j++; else j = 1;
    $(".celebrities li:nth-child("+j+")").fadeIn("fast");
    $(".celebrities li:nth-child("+i+")").fadeOut("fast");

  });

  // IE6 PNG fix
  if ($('html').hasClass('lt-ie7')) {
    DD_belatedPNG.fix('img, div.error, i, a, .section-raster-container, .logo, .png_bg');
  }

  // check radio-button "other amount"
  $('div.input.text.amount input').focus(function(){
    $('input[name=DonationAmount]').prop('checked', true);
  });

  /* ------ IE specifics ----------------------- */

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


// check form-height against document-height -> position fixed or relative
// this deals with the edge case when the form is too large to fit on a
// relatively short screen --> the submit button would be hidden and no
// scrollbars would be displayed, rendering the forum unsubmittable
function fixFormPosition() {
  if ($('body').hasClass('desktop')) {
    var formOffset = $('#action-form.block').offset();
    var formHeight = $('#action-form.block').height();
    if (formOffset.top + 30 + formHeight < $(window).height()) {
      $('#action-form').css({
        'position':'fixed'
      });
    }
  }
}
