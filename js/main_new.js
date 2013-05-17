var Flick = Flick || {}; 

Flick.App = (function(){
	var baseUrl = 'http://api.flickr.com/services/rest/?method=',
		getPublicPhotos = 'flickr.people.getPublicPhotos&',
		key = '75315540f618acde179e2c6b609889b8',
		user = '23498040%40N04',
		secret = '401e034e50dea749',
		getPhotos = 'flickr.photosets.getPhoto',
		baseUrl = 'http://api.flickr.com/services/rest/?method=',
		endUrl = '&api_key=' + key + '&user_id=' + user + '&format=json&jsoncallback=?',
		setID =null;
		
		var setsUrl = baseUrl + 'flickr.photosets.getList&api_key=' + key + '&user_id=' + user + '&format=json&jsoncallback=?';
		

	var init = function(){
		bindDOMevents();
		loadTemplate( 'nav', setsUrl, '#nav', function(data){
			console.log(data.photosets);
		});
	};

	var sayHay = function(){
		alert('say Haaaay');
	}

	var bindDOMevents = function(){
		$('ul#nav').on('click', 'li a',function(e){
			e.preventDefault();
			setID =  $(this).attr('id');
			loadPics();
		});
	};

	var loadPics = function(){
		var photosUrl = baseUrl + 'flickr.photosets.getPhotos&api_key=' + key + '&photoset_id=' + setID + '&format=json&jsoncallback=?';
			loadTemplate( 'pics', photosUrl, '#main');
	};

	var loadTemplate = function( name, url, divAppendTo, callback ){
		var templatePath = 'templates/' + name + '.tmpl.html';
		$.get(templatePath,function(templates){
			compiledTemp = Handlebars.compile(templates);
			$.getJSON(url ,function(data){
				console.log(data);
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

/**

OLD JS FILE BELOW


var Flick = Flick || {}; 

Flick.App = (function(){
	var baseUrl = 'http://api.flickr.com/services/rest/?method=',
		getPublicPhotos = 'flickr.people.getPublicPhotos&',
		key = '75315540f618acde179e2c6b609889b8',
		user = '23498040%40N04',
		secret = '401e034e50dea749',
		getPhotos = 'flickr.photosets.getPhoto',
		baseUrl = 'http://api.flickr.com/services/rest/?method=',
		endUrl = '&api_key=' + key + '&user_id=' + user + '&format=json&jsoncallback=?',
		url =null;
		
		//http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=4966e2ad2e85425a6b74ca4cf9ae2dea&photoset_id=72157632830386052&format=json&jsoncallback=?
	

	var init = function(){
		bindDOMevents();
		loadNav();	
	};

	var bindDOMevents = function(){
		$('ul#nav').on('click', 'li a',function(e){
			e.preventDefault();
			loadPics( $(this).attr('id') );
		});
	};

	var loadNav = function(){		
		var setsUrl = baseUrl + 'flickr.photosets.getList&api_key=' + key + '&user_id=' + user + '&format=json&jsoncallback=?';
		var compiledTemp;	
		$.get('templates/nav.tmpl.html',function(templates){
			compiledTemp = Handlebars.compile(templates);
			$.getJSON(setsUrl ,function(data){
				console.log(data);
				// $.each( data, function( key ) {
				// 	console.log( key );
				// });
				$("#nav").append(compiledTemp(data));
			});
		});
	};

	var loadPics = function(setID){
		var photosUrl = baseUrl + 'flickr.photosets.getPhotos&api_key=' + key + '&photoset_id=' + setID + '&format=json&jsoncallback=?';
		var compiledTemp;
		$.get('templates/pics.tmpl.html',function(templates){
			compiledTemp = Handlebars.compile(templates);
			$.getJSON(photosUrl ,function(data){
				$("#main").append(compiledTemp(data));
			});
		});
	};

	/**
	var loadTemplate = function( name, url, divAppendTo, callback ){
		var templatePath = 'templates/' + name + '.tmpl.html';
		$.get(templatePath,function(templates){
			compiledTemp = Handlebars.compile(templates);
			$.getJSON(url ,function(data){
				console.log(data);
				$(divAppendTo).append(compiledTemp(data));	
				if(callback) callback(data);
			});
		});
	};
	**/

	return {	
		init: init
	}

}());

$(document).ready(function(){
	Flick.App.init();
});




**/



