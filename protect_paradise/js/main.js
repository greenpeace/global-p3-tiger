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


/**!
 * $.p3.request
 *
 * Query string parser, returns the url and an object
 * containing the GET parameters in key: value format
 *
 * Required in most $.p3 libraries
 *
 * @author          <a href="mailto:hello@raywalker.it">Ray Walker</a>
 * @requires        <a href="http://jquery.com/">jQuery</a>
 * @usage           $.p3.request('http://fish.com?type=salmon');
 * @version         0.1
 * @param           {string} url jQuery
 * @returns         {object} { url: 'http://fish.com', parameters: { type: 'salmon' } }
 */
(function($) {
    'use strict';
    var _p3 = $.p3 || {};

    _p3.request = function(url) {
        var request = {
          url: false,
          parameters: false
        },
        parts,
        getRequestParams = function() {
            var params = {};

            if (parts[1]) {
                parts[1].split(/[&;]/g).forEach(function (param) {
                    var q = param.split(/\=/);
                    if (q.length > 1 && q[0].length && q[1].length) {
                        params[q[0]] = q[1];
                    }
                });
            }
            return params;
        },
        getRequestURL = function() {
            return (parts[0].length) ? parts[0] : url;
        };

        if (url) {
          parts = url.split('?');
        } else {
          return request;
        }

        request.url = getRequestURL(),
        request.parameters = getRequestParams();

        return request;
    };

    $.p3 = _p3;

}(jQuery));

$(document).ready(function() {
  // Resize parallax sections to fill the screen
  var tsw_resize_timer = false,
  $sections = jQuery('.desktop .section-container, .desktop .section-raster-container'),
  minSectionHeight = 720;

  $sections.each(function () {
    var $this = $(this);
    if (!$this.data('original-height')) {
      $this.data('original-height', $this.height());
    }
  });

  function resizeSections(min) {
    // Debounce resize event
    clearTimeout(tsw_resize_timer);
    tsw_resize_timer = setTimeout(function() {
      if (jQuery('body').hasClass('desktop')) {
        // Get the new window size
        var height = jQuery(window).height() - jQuery('#header-container1').height();
        if (height < min) {
          // Not too small
          height = min;
        }
        // Apply the new size
        $sections.each(function() {
          var $this = jQuery(this),
          original = $this.data('original-height');

          // If the new height is smaller than the original, use the original
          if (height < original) {
            height = original;
          }
          // Set the height
          $this.height(height);
        });
      } else {
        // Not a desktop (anymore!), use the default values
        $sections.each(function() {
          var $this = jQuery(this);
          if ($this.data('original-height')) {
            $this.height($this.data('original-height'));
          }
        });
      }
    }, 100);
  }

  // Initialise parallax sizes
  resizeSections(minSectionHeight);

  /* ============================ VALIDATION ================================ */
  var formSelector = '#action-form',
  $errorHolder = $('<div id="errorMessageHolder" class="message"></div>');

  // Custom rule for select field
  $.validator.addMethod("valueNotEquals", function(value, element, arg){
   return arg !== value;
  }, "Value must not equal arg.");


  $('#action-form-tiger', formSelector).prepend($errorHolder);

  $.p3.validation(formSelector, {
    jsonURL: false,
    errorPlacement: function(error, element) {
      var $this = $(element),
      name = $this.attr('name');
      $this.parents('.' + name).first().find('div.message').html(error);
    },
    showErrors: function(errorMap, errorList) {
      var $form = $(formSelector);

      // Clear old errors
      $(":input:visible", $form).each(function() {
        var $this = $(this),
        name = $this.prop('name');
        if (name) {
          // Ensures this is an actual form field
          $this.removeClass("error");
          $this.parents('.' + name).first().find('.message').html('');
        }
      });

      if (errorList.length) {
        // Display only the first error in the array
        var $firstErrorField = $(errorList[0]['element']);

        $firstErrorField.addClass("error");

        $errorHolder.html('<span class="error" for="' + $firstErrorField.prop('id') + '">' + errorList[0]['message'] + '</span>');
      }
    },
    rules: {
      "firstname": {
        "alphaPlus": true,
        "required": true
      },
      "lastname": {
        "alphaPlus": true,
        "required": true,
        "minlength": 3
      },
      "email": {
        "required": true,
        "email": true
      },
      "phone": {
        "required": true,
        "numeric":   true,
        "minlength": 8
      },
      "country": {
        "required": true,
        "valueNotEquals": '00'
      }
    },
    messages: {
      "firstname":  "Please enter your first name",
      "lastname":   "Please enter your last name",
      "email":      "Please enter a valid email address",
      "phone":      "Please enter your phone number",
      "country":    "Please select your country"
    }
  });

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
