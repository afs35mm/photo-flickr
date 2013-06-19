var Main = Main || {}; 

Main.App = (function(){
	
	var slideHeight = $('#top').height(),
		headHeight = $('#header').height(),
		canShowHead = true,
		positionY = 0;

	var init = function(){
		$('#imgs').EzFade();
		bindDomEvents();
		Flick.App.init();
	};

	var mainShow = function(){
		canShowHead = false;
		positionY = window.pageYOffset;
		$('#header').removeClass('scroll').parent().siblings('#main').fadeIn().siblings('#close').show();
		//$('#main').fadeIn();
		window.scrollTo(0,0)
		//$('#close').show();
	};

	var mainHide = function(){
		canShowHead = true;
		$('#main').fadeOut().css('position','absolute').children('#pics').empty().parent().siblings('#close').hide();
		//$('#close').hide();
		//$('#pics').empty();
		window.location.hash = '';
		window.scrollTo(0,positionY)
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
		});

		$('#about').on('click',function(e){
			e.preventDefault();
			$('#main').css('position','fixed').children('#pics').load('templates/about.tmpl.html #abt');
			//$('#pics').load('templates/about.tmpl.html #abt');
			mainShow();
			
		});
	};

	return {	
		init: init,
		mainShow: mainShow
	}

}());

