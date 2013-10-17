$(document).ready(function () {


    fixFormPosition();

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
    // Validierung für >=IE9
    if ($('html').hasClass('lt-ie10')) {

        $('.select label, .text label').css({
            'display': 'block'
        });



//
            window.validated = true;

            // validate not empty
            $('#UserEmail, #UserFirstname, #UserLastname').keyup(function () {
                if ($(this).val() == '') {
                    $(this).parent().find('.error').css('background', 'none').remove();
                    $(this).after('<div class="error">This field is required!</div>');
                    $(this).css({
                        'border': '3px solid red'
                    });

                } else {
                    $(this).css({
                        'border': '1px solid grey'
                    });
                    $(this).parent().find('.error').css('background', 'none').remove();
                }
//                alert('blur');
                fixFormPosition();
                return true;
            });

            //validate email-string-structure
        $('#UserEmail').keyup(function() {
            var email = $('#UserEmail').val();

                if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) == null) {

                    $(this).after('<div class="error">Please enter a valid email address!</div>');
                    $(this).css({
                        'border': '3px solid red'
                    });

                } else   {
                $(this).css({
                    'border': '1px solid grey'
                });
                $(this).parent().find('.error').css('background', 'none').remove();
                return true;
            }
        });


        $('#action-submit-full input').click(function (event) {
//            alert('submit');
            $('#UserEmail, #UserFirstname, #UserLastname').keyup();
            $('.error').first().parent().find('input').focus();
          // check summary of all required fields
            if ($('.error').length > 0) {
//                alert('error');
                return false;
            } else {
//                alert('no error');
                return true;
            }
        });


    }
});


// check form-height against document-height -> position fixed or relative
function fixFormPosition() {
    var formOffset = $('#action-form').offset();
    var formHeight = $('#action-form').height();
    if (formOffset.top + formHeight < $(window).height()) {
        $('#action-form').css({
            'position':'fixed'
        });
    }
}