// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

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

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = $(element);
        self = this;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;        
        this.windowDimensions = {};
        this.childDimensions = {};
        
        this.init();
        console.log(this);

        $(window).resize(function(){
            
        });
    }

    Plugin.prototype = {

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            this.element.addClass(defaults.parentName).css({
                'width' : defaults.width,
                'height' : defaults.height,
                'position': defaults.position, 
                'overflow': 'hidden'
            }).children().addClass(defaults.childName).css({
                'position': 'absolute'

            });

            this.getWindowDimensions(this);

            $(self.element).children().each(function(key,val){
                var _val = $(val);
                _val.load(function(){
                    var imgWidth = _val.width()
                        imgHeight = _val.height(),
                        imgRatio = imgWidth / imgHeight;
                        self.childDimensions[key] = {};
                        self.childDimensions[key].w = imgWidth;
                        self.childDimensions[key].h = imgHeight;
                        self.childDimensions[key].ratio = imgRatio;
                        //console.log(self.childDimensions[key].ratio );
                        self.resize(self.windowDimensions.ratio, self.childDimensions[key].ratio , _val)
                });
            });
        },

        getWindowDimensions: function(obj){
            obj.windowDimensions.w = obj.element.width();
            obj.windowDimensions.h = obj.element.height();
            obj.windowDimensions.ratio = obj.windowDimensions.w /obj.windowDimensions.h;
            console.log(obj.windowDimensions);
        },

        resize: function(windowRatio, childRatio, imgToResize){
            if(childRatio <= windowRatio){
                imgToResize.css({
                    'width': this.windowDimensions.w
                })
                .css('top', (-( imgToResize.height() - this.windowDimensions.h) / 2));
            }else if (childRatio > windowRatio){
                imgToResize.css({
                    'height': this.windowDimensions.h
                })
                .css('left', (-( imgToResize.width() - this.windowDimensions.w) / 2));
            }
        }   
    };

    //     startFade: function(el){
    //         var elmID = $(el).attr('id');
    //         console.log(el);
    //         setInterval(function(){
    //         console.log(elmID);
    //             $(el).children(":first")
    //                 .animate({'opacity':0},defaults.fadeSpeed)
    //                 .next('img')
    //                 .animate({'opacity':100},defaults.fadeSpeed)
    //                 .end()
    //                 .appendTo('#' + elmID);
    //         },defaults.duration); 
    //     },

    //     getDimensions: function(el){
    //         this.dimensions.width = el.width();
    //         this.dimensions.height = el.height();
    //         this.dimensions.ratio = (this.dimensions.width / this.dimensions.height);
    //     },

    //     getChildrenSize : function(el){
    //         var parent = this;
    //         el.children().each(function(key,val){
    //             var elm = $(val);
    //             elm.load(function(){
    //                 var elmRatio = elm.width() / elm.height();
    //                 if(elmRatio <= parent.dimensions.ratio){
    //                     elm.css({
    //                         'width': parent.dimensions.width,
    //                         'visibility' : 'visible' 
    //                     })
    //                     .css('top', (-( elm.height() - parent.dimensions.height) / 2));
    //                 }else if (elmRatio > parent.dimensions.ratio){
    //                      elm.css('height', parent.dimensions.height)
    //                     .css('left', (-( elm.width() - parent.dimensions.width) / 2));
    //                 }
    //                 if(key != 0){
    //                     elm.css('opacity',0);
    //                 } 
    //             }).each(function(){
    //                 if(this.complete){
    //                     $(this).trigger('load');
    //                 }
    //             });
    //         });
    //     }
    //};

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };



})( jQuery, window, document );