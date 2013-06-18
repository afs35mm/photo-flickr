var Main = Main || {}; 

Main.App = (function(){
	
	var slideHeight = $('#top').height(),
		headHeight = $('#header').height();

	var init = function(){
		bindDomEvents();
	};

	var bindDomEvents = function(){
		$(window).on('scroll',function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop <= slideHeight -  headHeight){
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

