(function($) {

    $.fn.superFade = function(options) {

    	var settings = $.extend({
            transition : 'fade',
            duration: 3000,
            parentName: 'superFade',
            elmName: 'superFadeElm',
            fadeSpeed: 1000
        }, options);        

        var self = $(this);

        this.each( function() {
            var elm = $(this),
                elmWidth = elm.width(),
                elmHeight = elm.height(),
                elmRatio = elmWidth / elmHeight;
            //console.log(elmWidth,elmHeight);
            elm.addClass(settings.parentName).children(":first").css('display','inline');
            elm.children().each(function(){
                
                var slideImg = $(this);
                slideImg.addClass(settings.elmName);
                slideImg.load(function() {
                    var w = this.width,
                        h = this.height;
                    
                    if( w >= h ){
                        slideImg.css('height',elmHeight);
                        //console.log('image is landscape');
                        if( w > elmWidth ){
                            //console.log('image is wider than page');
                        }else if ( w < elmWidth){
                            //console.log('image is skinnier than page');
                        }
                    }
                    else if ( h >= w ) {
                        slideImg.css('width',elmWidth);
                        //console.log('image is portrait');
                        if( h > elmHeight ){
                            //console.log('image is taller than page');
                        }else if ( h < elmHeight){
                            //console.log('image is shorter than page');
                        }
                    }

                });
            });
            setInterval(function(){
                self.children(":first").fadeOut(settings.fadeSpeed).next('img').fadeIn(settings.fadeSpeed).end().appendTo('.' + settings.parentName);
            },settings.duration);    
        });

        return this;
    }

}(jQuery));


//http://stackoverflow.com/questions/1143517/jquery-resizing-image