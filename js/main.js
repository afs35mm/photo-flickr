var Flick = Flick || {}; 

Flick.App = (function(){
	var baseUrl = 'http://api.flickr.com/services/rest/?method=',
		getPublicPhotos = 'flickr.people.getPublicPhotos&',
		key = '75315540f618acde179e2c6b609889b8',
		user = '23498040%40N04',
		secret = '401e034e50dea749',
		getPhotos = 'flickr.photosets.getPhoto',
		baseUrl = 'http://api.flickr.com/services/rest/?method=',
		endUrl = '&api_key=' + key + '&user_id=' + user + '&format=json&jsoncallback=?';
		//setID =null;
		
		var setsUrl = baseUrl + 'flickr.photosets.getList&api_key=' + key + '&user_id=' + user + '&format=json&jsoncallback=?';
		

	var init = function(){
		bindDOMevents();
		loadTemplate( 'nav', setsUrl, '#nav', function(data){
			var length = data.photosets.photoset.length;			
			replaceLinks();
		});
		var hash = location.hash;
		if(hash != ''){
			alert(hash);
			var linkNeeded = $('ul#nav a').has('a[href="'+hash+'"]');
			console.log(linkNeeded.attr('id'));
		}	
		
	};

	var replaceLinks = function(){
		$('ul#nav li a').each(function(){
			var dataTitle = $(this).attr('href');
			//dataTitle = dataTitle 
			dataTitle = dataTitle.replace(/\s+/g, '-').toLowerCase();
			//console.log(dataTitle);
			$(this).attr('href', '#' + dataTitle)
		});
	};

	var bindDOMevents = function(){
		$('ul#nav').on('click', 'li a',function(e){
			var setID =  $(this).attr('id');
			loadPics( setID );
			var setName =  $(this).children('span').text() ;		
		});
	};

	var loadPics = function(set){
		$('#main').empty();
		var photosUrl = baseUrl + 'flickr.photosets.getPhotos&api_key=' + key + '&photoset_id=' + set + '&format=json&jsoncallback=?';	
		loadTemplate( 'pics', photosUrl, '#main');
	};

	var loadTemplate = function( name, url, divAppendTo, callback ){
		var templatePath = 'templates/' + name + '.tmpl.html';
		$.get(templatePath,function(templates){
			compiledTemp = Handlebars.compile(templates);
			$.getJSON(url ,function(data){
				//console.log(data);
				$(divAppendTo).append(compiledTemp(data));	
				if(callback) callback(data);
			});
		});
	};

	return {	
		init: init
	}

}());

$(document).ready(function(){
	Flick.App.init();
});

