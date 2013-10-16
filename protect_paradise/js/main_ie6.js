$(document).ready(function () {
    if ($('html').hasClass('lt-ie9')) {
        // fallback for css selector
        $(".celebrities li:nth-child(n+4)").hide();

        $('.select label, .text label').css({
            'display': 'block'
        });

        $('#action-form-tiger').submit(function (event) {
            window.validated = true;

            // validate not empty
            $('#UserEmail, #UserFirstname, #UserLastname').each(function () {
                if ($(this).val() == '' || $(this).val() == 'Please fill out this field!') {
                    $(this).val('Please fill out this field!');
                    $(this).css({
                        'background': 'orange'
                    });
                    window.validated = false;
                }

            });

            //validate email-string-structure
            if ($('#UserEmail').val() != '' || $('#UserEmail').val() != 'Please fill out this field!') {
                var email = $('#UserEmail').val();

                if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) == null) {

                    $('#UserEmail').val('Email not valid!');
                    $('#UserEmail').css({
                        'background': 'orange'
                    });
                    window.validated = false;
                }
            }


            // check summary of all required fields
            if (window.validated == false) {
                return false;
            }

        });

        $('#UserEmail, #UserFirstname, #UserLastname').focus(function () {
            if ($(this).val() == 'Please fill out this field!' || $(this).val() == 'Email not valid!') {
                $(this).val('');
                $(this).css({
                    'background': 'white'
                });
            }
        });

    }
});
