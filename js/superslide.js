(function($) {

    $.fn.superSlide = function(options) {

    	var settings = $.extend({
            transition : 'fade',
            duration: 7000,
            elmName: 'superSlideElm',
            fadeSpeed: 500
        }, options);        

        var self = $(this);

        var cycleElms = function(){
           //console.log(self);
           var lastChild = self.children(":last");
           console.log(self.children(":first"));
           lastChild.fadeOut( settings.fadeSpeed , function(){

           });
        };

        this.each( function() {
            $(this).addClass('superSlide');
            $(this).children().each(function(key,value){
                console.log(key,value)
                $(value).addClass(settings.elmName).css('z-index',500 - key);
            });
            //setInterval(cycleElms,3000);    
        });

        return this;
    }

}(jQuery));