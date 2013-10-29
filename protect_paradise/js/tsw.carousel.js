/**!
 * $.tsw.carousel
 *
 * @copyright		Copyright 2013, Greenpeace International
 * @license			MIT License (opensource.org/licenses/MIT)
 */
$(document).ready(function() {
  // celebrities carousel
  var i = 2;
  var j = 1;
  var max = $(".celebrities li").size();

  $("#js-show-more").click(function(){
    if(i<max) i++; else i = 1;
    if(j<max) j++; else j = 1;
    $(".celebrities li:nth-child("+i+")").fadeOut("fast", function() {
    	$(".celebrities li:nth-child("+j+")").fadeIn("fast");
		});
  });
});
