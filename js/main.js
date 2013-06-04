var Main = Main || {}; 

Main.App = (function(){
	
	var slideHeight = $('#top').height();

	var init = function(){
		bindDomEvents();
	};

	var bindDomEvents = function(){
		$(window).on('scroll',function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop <= slideHeight ){
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

