/**!
 * $.p3.parallax
 *
 * @copyright		Copyright 2013, Greenpeace International
 * @license			MIT License (opensource.org/licenses/MIT)
 */
// Resize parallax sections to fill the screen
window.tsw_resize_timer = false;
function resizeSections() {
  // debounce resize event
  clearTimeout(window.tsw_resize_timer);
  window.tsw_resize_timer = setTimeout(function () {
    if ($('body').hasClass('desktop')) {
      $('.desktop .section-container, .desktop .section-raster-container').height( $(window).height() - $('#header-container1').height() );
    } else {
      $('.tablet .section-container, .tablet .section-raster-container').attr('style','');
    }
  },50);
}

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
  } else {
    $('#action-form').css({
      'position':''
    });
  }
}
$(document).ready(function() {
  // Initialise parallax sizes
  resizeSections();

  /* ----- initializing -------------------------- */
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

  // check radio-button "other amount"
  $('div.input.text.amount input').focus(function(){
    $('input[name=DonationAmount]').prop('checked', true);
  });

  /* ----- resizing -------------------------- */
  // gets true when crossed the breakpoint
  window.breakpointPassed = $('body').hasClass('desktop');

  // stuff to recalc when resized resp when crossing the breakpoint
  $(window).resize(function() {
    var $body = $('body');

    // Resize each parallax section to fill the screen
    resizeSections();

    // recalc form positioning
    fixFormPosition();

    // switch to desktop
    if (!window.breakpointPassed && $body.hasClass('desktop')) {
      $('#section-container1').parallax("50%", 0.1);
      $('#section-container2').parallax("50%", 0.2);
      $('#section-container3').parallax("50%", 0.1);

      window.breakpointPassed = true;
    }

    // switch to mobile
    if (window.breakpointPassed && !$body.hasClass('desktop')) {
      // reset breakpoint indicator
      window.breakpointPassed = false;
    }

  });

});

