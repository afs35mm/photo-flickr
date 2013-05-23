(function($) {

    $.fn.superSlide = function(options) {

    	var settings = $.extend({
            duration : 7000,
        }, options);

    	//console.log(settings);
    	var sayHay = function(){
        	console.log(this);
        };

        return this.each( function() {
            $(this).addClass('superSlide');
            $(this).children().addClass('superSlideElm');
            //setInterval(startFade,5000);
        });

    }

}(jQuery));