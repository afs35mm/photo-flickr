var Main = Main || {}; 

Main.App = (function(){
	
	var GLOBALVAR = 'xyz';

	var init = function(){
		bindDomEvents();
	};

	var bindDomEvents = function(){
		$(window).on('scroll',function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop == 0 ){
				$('#header').removeClass('scroll');
			}else{
				$('#header').addClass('scroll');
			}
		});
	};

	return {	
		init: init
	}

}());

