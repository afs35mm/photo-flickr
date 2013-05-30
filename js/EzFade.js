(function($) {
    $.fn.EzFade = function(options) {
    	var settings = $.extend({
            transition : 'fade',
            duration: 3000,
            parentName: 'superFade',
            elmName: 'superFadeElm',
            fadeSpeed: 1000
        }, options);        
        var self = $(this);
        $(this).find('img').last().load(function(){           
           self.addClass(settings.parentName).children(":first").css('display','inline');
           self.each( function() {
                var container = $(this),
                    containerHeight = container.height(),
                    containerWidth = container.width(),
                    ratio = containerWidth / containerHeight;
                container.children().each(function(){
                    var elm = $(this),
                        elmRatio = elm.width() / elm.height();
                    elm.addClass(settings.elmName);   
                    if( ratio < elmRatio){
                        elm.css('height', containerHeight)
                        .css( 'left', -(elm.width() - containerWidth) / 2 );
                    }else if (ratio > elmRatio ){
                       elm.css('width', containerWidth)
                       .css( 'top', -(elm.height() - containerHeight) / 2 );
                    }
                });
                setInterval(function(){
                    self.children(":first")
                        .fadeOut(settings.fadeSpeed)
                        .next('img')
                        .fadeIn(settings.fadeSpeed)
                        .end()
                        .appendTo('.' + settings.parentName);
                },settings.duration); 
            });
        });
        return this;
    }
}(jQuery));