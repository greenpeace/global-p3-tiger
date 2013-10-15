
$(document).ready(function(){
	if ($('html').hasClass('lt-ie9')) {
    // fallback for css selector
    $(".celebrities li:nth-child(n+4)").hide();

        $('.select label, .text label').css({
            'display': 'block'
        });
    }

});
