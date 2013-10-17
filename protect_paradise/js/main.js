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
	$('#section-container1').parallax("50%", 0.1);
	$('#section-container2').parallax("50%", 0.2);
	$('#section-container3').parallax("50%", 0.1);
	
	var i = 3;
	var j = 0;
	var max = $(".celebrities li").size();

	$("#js-show-more").click(function(){
			if(i<max) i++; else i = 1;
			if(j<max) j++; else j = 1;
		  //console.log('show:'+i+'; hide:'+j); // console.log is a big NO-NO for IE < 8
			$(".celebrities li:nth-child("+j+")").fadeOut("fast");
			$(".celebrities li:nth-child("+i+")").fadeIn("fast");

	});

// IE6 PNG fix
	if ($('html').hasClass('lt-ie9')) {
        DD_belatedPNG.fix('img, div.error, i, a, .section-raster-container, .logo, .png_bg');
    }




});



