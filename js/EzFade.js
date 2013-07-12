;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = "EzFade",
        defaults = {
            duration: 3000,
            parentName: 'EzFade',
            childName: 'EzFadeElm',
            fadeSpeed: 1000,
            width: '100%',
            height: '100%',
            position: 'relative'
        };

    // plugin constructor
    function Plugin( element, options ) {
        this.element = $(element);
        self = this;

        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;        
        this.container ={}

        this.init();

    }

    Plugin.prototype = {

        getContainerSize: function(el,obj,callback){
            console.log(el.width(), el.innerWidth(), el.outerWidth());
            obj.width = el.innerWidth();
            obj.height = el.height();
            obj.ratio = obj.width / obj.height;
            if(callback){
                callback();
            }
        },

        resizePhoto: function(photo){
            var photoHeight = photo.height(),
                photoWidth = photo.width(),
                photoRatio = photoWidth / photoHeight,
                resizeAmt = null;
            //This if statement resizes based on height or width
            if(photoRatio <= self.container.ratio){
                resizeAmt = photoHeight * ( self.container.width / photoWidth );
                photo.css({
                    'width': self.container.width,
                    'top' : - ((resizeAmt - self.container.height) / 2)
                });
            }else{
                resizeAmt = photoWidth * ( self.container.height / photoHeight );
                photo.css({
                    'height': self.container.height,
                    'left': - ((resizeAmt - self.container.width) / 2)
                });
            }
        },

        init: function() {
            //As soon as it loads add classes and styles to parent and children
            self.element.append('LOADING').addClass(defaults.parentName)
                .css({
                    'overflow': 'hidden'
                })
                .children().each(function(key,val){
                    $val = $(val);
                    $val.addClass(defaults.childName).css({
                        'position': 'absolute',
                        'opacity': '0'
                    });
                });
            //when it loads finally resize all elements
            //TO DO: remove loading text/gif
            $(window).load(function(){
                self.getContainerSize(self.element, self.container, function(){
                    self.element.children().each(function(key,value){
                        var $val = $(value);
                        self.resizePhoto($val);
                        if(key == 0){
                            $val.css({
                                'opacity' : '100'
                            });
                        }
                    });
                });
            });
        }
  
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };



})( jQuery, window, document );