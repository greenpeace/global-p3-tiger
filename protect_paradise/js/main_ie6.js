
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

    }

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
            $('#UserEmail, #UserFirstname, #UserLastname').keyup();
            $('.error').first().parent().find('input').focus();
          // check summary of all required fields
            if ($('.error').length > 0) {
                return false;
            } else {
                return true;
            }
        });


    $('div.input.text.amount input').keyup(function() {
        var otherAmount = $('div.input.text.amount input').val();

        if (isNaN(otherAmount)) {
            $(this).parent().find('.error').css('background', 'none').remove();
            $(this).after('<div class="error">Please enter a valid number!</div>');
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

    // für donation.html: validate "other amount" field
    if ($('input[name=DonationAmount]').length > 0 ) {

        $('#donate-form-tiger').submit(function(){
            $('div.input.text.amount input').keyup();
        });
    }


});


// check form-height against document-height -> position fixed or relative
function fixFormPosition() {
  if ($('body').hasClass('desktop')) {
    var formOffset = $('#action-form.block').offset();
    var formHeight = $('#action-form.block').height();
    if (formOffset.top + 30 + formHeight < $(window).height()) {
        $('#action-form').css({
            'position':'fixed'
        });
//        alert('resize');
    }
  }
}