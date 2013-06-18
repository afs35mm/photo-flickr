var Main = Main || {}; 

Main.App = (function(){
	
	var slideHeight = $('#top').height(),
		headHeight = $('#header').height(),
		canShowHead = true;

	var init = function(){
		$('#imgs').EzFade();
		bindDomEvents();
		Flick.App.init();
	};

	var mainShow = function(){
		canShowHead = false;
		$('#main').show();
		window.scrollTo(0,0)
		$('#close').show();
	};

	var mainHide = function(){
		canShowHead = true;
		$('#main').fadeOut().css('position','absolute');
		$('#close').hide();
		window.location.hash = '';
	}

	var bindDomEvents = function(){
		$(window).on('scroll',function(){
			var scrollTop = $(window).scrollTop();
			if(canShowHead){
				if(scrollTop <= slideHeight -  headHeight){
				$('#header').removeClass('scroll');
				}else{
					$('#header').addClass('scroll');
				}
			}
		});

		$('#close').on('click',function(){
			mainHide();
			//$('#main');
		});

		$('#about').on('click',function(){
			$('#main').empty().css('position','fixed');
			mainShow();
		});
	};

	return {	
		init: init,
		mainShow: mainShow
	}

}());

