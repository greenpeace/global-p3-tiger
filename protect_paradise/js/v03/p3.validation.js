
/**!
 * p3.validation.js
 *
 * @fileOverview Wrapper over the jquery.validation.js plugin for Greenpeace
 *               Action Template v03.
 *               Validates form data against XRegExp rules obtained via JSON endpoint
 * @author      <a href="mailto:hello@raywalker.it">Ray Walker</a>
 * @version     0.2.3
 * @copyright   Copyright 2013, Greenpeace International
 * @license	MIT License (opensource.org/licenses/MIT)
 * @requires    <a href="http://jquery.com/">jQuery 1.7+</a>,
 *              <a href="http://modernizr.com/">Modernizr</a>,
 *              <a href="http://xregexp.com/">XRegExp</a>
 *              <a href="http://jqueryvalidation.org/">jQuery Validate</a>
 *              $.p3.request
 * @example     $.p3.validation('#action-form'[, options]);
 *
 */
/* global jQuery, Modernizr, XRegExp */
(function($, M) {
    'use strict';

    var _p3 = $.p3 || {}, // Extends existing $.p3 namespace
    defaults = {
        loadGetParams: true,
        jsonURL: 'https://www.greenpeace.org/api/p3/pledge/config.json',
        tests: {
            // Matches all unicode alphanumeric characters, including accents
            // plus . , - ' /
            // Note for end users: when overriding or creating tests,
            // character strings must be double escaped: \\ instead of \
            // http://stackoverflow.com/questions/16572123/javascript-regex-invalid-range-in-character-class
            alphaPlus: "^[\\p{L}\\p{N}\\.\\-\\'\\,\\/]+$",
            numeric: "^\\p{N}+$",
            alpha: "^\\p{L}+$"
        },
        // Not implemented
        showSummary: false,
        // Forbid form submission if there's an error receiving JSON or in parsing
        disableOnError: false,
        // Error element to use instead of jquery.validate default <label>
        errorElement: 'span',
        // Overrides jquery.validate default positioning
        errorPlacement: function(error, element) {
            $(element).parent().find('div.message').html(error);
        },
        // Query string parameters to include in validation request
        params: {},
        messageElement: '<div class="message"></div>'
    };

    _p3.validation = function(el, options) {

        var config = $.extend(true, defaults, options || {}),
        request = $.p3.request(config.jsonURL),
        // Merge request GET variables from all configuration sources: json > parameters > defaults
        query = {
            url: request.url,
            parameters: $.extend(true, request.parameters, config.params)
        },
        $el = $(el),
        $form = $el.is('form') ? $el : $('form', el),
        messageDiv = config.messageElement,
        /* the main action function */
        validate = function () {
            // Add any custom tests
            $.each(config.tests, function(name, regexp) {
                // Don't trust the user entered data
                try {
                    // Create a new validator method
                    $.validator.addMethod(name, function(value, element) {
                        var reg = new XRegExp(regexp);
                        return this.optional(element) || reg.test(value);
                    });
                } catch (err) {
//                            console.log("Failed to add test '" + name + "' with regex '" + regexp + "'");
                }
            });

            // Add message div to required fields
            // if it doesn't already exist in template
            $(':input', $form).each(function() {
                var $this = $(this),
                name = $this.prop('name'),
                $parent = (name) ? $this.parents('.' + name).first() : false;
                if ($parent) {
                  if (!$parent.find('div.message').length) {
                      $parent.append(messageDiv);
                  }
                }

            });

            // Initialise the jQuery.validate plugin
            $form.validate(config);

            // Submit the form of auto_sign is true
            if (config.loadGetParams) {
                if (getVars.auto_sign == true) { // Yes i do mean == instead of === (allows either auto_sign=1 or auto_sign=true)
                    $form.submit();
                }
            }
        };

        // Add the summary
        if (config.showSummary) {
            config.summaryElement = $('.errorSummary', el).length ? $('.errorSummary', el) : $(el).prepend('<div class="errorSummary"></div>');
        }

        if (config.loadGetParams) {
            // Obtain GET variables from the URL
            var getVars = $.p3.request(window.location.href).parameters;

            // Populate form fields from GET variables
            $.each(getVars, function(field, value) {
                $('input[name=' + field + ']', $form).val(value);
            });
        }

        if (query.url) {
            // Only check for JSON if we intend to use the JSON endpoint
            M.load({
                test: window.JSON,
                nope: [
                    'js/v03/lib/json.min.js'
                ],
                complete: function() {
                    // Fetch rules from remote service and extend configuration
                    $.getJSON(query.url, query.parameters, function(data) {
                        $.extend(true, config, data || {});
                    }).fail(function() {
                        // Failed to obtain JSON
                        console.log('$.p3.validation :: WARNING :: JSON failed to load from: ' + config.jsonURL);

                        if (config.disableOnError) {
                            // Disable validation plugin if can't load JSON
                            $('submit', $form).prop('disabled', 'disabled').addClass('disabled');
                            console.log('$.p3.validation :: Form input disabled');
                            return false;
                        } else {
                            console.log('$.p3.validation :: Attempting to continuing regardless...');
                        }
                        // Else try to continue with existing rules...
                    });

                    // Perform validation
                    validate();
                }
            });
        } else {
            // Perform validation
            validate();
        }
    };

    // Overwrite previous namespaced object
    $.p3 = _p3;

}(jQuery, Modernizr));