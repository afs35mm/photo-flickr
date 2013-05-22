(function($){
	
	$.fn.slideShow = function(){
		var width, height;
		this.addClass('slideShow');
		width = $('body').innerWidth();
		height = this.height();
		this.children('img').width(width).height(height);
		//this.css('background-color','red')
		return this;
	};

})(jQuery);
