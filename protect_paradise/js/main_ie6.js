$(document).ready(function () {

    if ($('html').hasClass('lt-ie8')) {
        $('#UserEmail, #UserFirstname, #UserLastname').parent().find('label').each(function(){
            var text = $(this).text();
            $(this).text(text + ' *');
        });
    }
    if ($('html').hasClass('lt-ie9')) {
        // fallback for css selector
        $(".celebrities li:nth-child(n+4)").hide();
    }
    // Validierung für <IE10
    if (!( $('html').hasClass('lt-ie9') || $('html').hasClass('lt-ie8') || $('html').hasClass('lt-ie7'))) {

        $('.select label, .text label').css({
            'display': 'block'
        });



//
            window.validated = true;

            // validate not empty
            $('#UserEmail, #UserFirstname, #UserLastname').blur(function () {
                if ($(this).val() == '') {
                    $(this).parent().find('.error').css('background', 'none').remove();
                    $(this).after('<div class="error">This field is required!</div>');
                    $(this).css({
                        'border': '3px solid red'
                    });

                } else {
                    $(this).css({
                        'border': 'none'
                    });
                    $(this).parent().find('.error').css('background', 'none').remove();
                }

            });

            //validate email-string-structure
        $('#UserEmail').blur(function() {
            var email = $('#UserEmail').val();

                if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) == null) {

                    $(this).after('<div class="error">Please enter a valid email address!</div>');
                    $(this).css({
                        'border': '3px solid red'
                    });

                } else   {
                $(this).css({
                    'border': 'none'
                });
                $(this).parent().find('.error').css('background', 'none').remove();
            }
        });


        $('#action-form-tiger').submit(function (event) {
            $('#UserEmail, #UserFirstname, #UserLastname').blur();
            $('.error').first().parent().find('input').focus();
          // check summary of all required fields
            if ($('.error').length > 0) {
                return false;
            }

        });


    }
});
