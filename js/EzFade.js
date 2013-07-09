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
            elmName: 'EzFadeElm',
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
        
        this.dimensions = {};
        this.childDimensions = {};
        
        this.init();

        console.log(this);
        
        $(window).resize(function(){
            self.getDimensions(self.element);
            self.getChildrenSize(self.element);
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
       
            this.element.addClass('defaults.parentName').css({
                'width' : defaults.width,
                'height' : defaults.height,
                'position': defaults.position, 
                'overflow': 'hidden'
            }).children().css({
                'position': 'absolute'
            });

            this.getDimensions(this.element);
            this.getChildrenSize(this.element);

            // this.getContainerSize(this.element);
            // this.getChildrenSize(this.element);
        },

        getDimensions: function(el){
            this.dimensions.width = el.width();
            this.dimensions.height = el.height();
            this.dimensions.ratio = (this.dimensions.width / this.dimensions.height);
        },

        getChildrenSize : function(el){
            
            var parent = this;

            el.children().each(function(key,val){
                var elm = $(val);
                elm.load(function(){
                    var elmRatio = elm.width() / elm.height();
                    if(elmRatio <= parent.dimensions.ratio){
                        elm.css('width', parent.dimensions.width)
                        .css('top', (-( elm.height() - parent.dimensions.height) / 2));
                    }else if (elmRatio > parent.dimensions.ratio){
                         elm.css('height', parent.dimensions.height)
                        .css('left', (-( elm.width() - parent.dimensions.width) / 2));
                    }
                }).each(function(){
                    if(this.complete){
                        $(this).trigger('load');
                    }
                });
            });
        }
    };

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