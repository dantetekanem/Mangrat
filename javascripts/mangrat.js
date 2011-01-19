var MANGA_NAME;
var MANGA			= {};
var CHAPTERS		= [];
var CHAPTER;
var CHAPTER_POS;
var PAGE;
var SCROLLER_SPEED	= 300;
var animating		= false;
var allowClickChangePage	= false;

var lang			= {
	loading:		'carregando...',
	selectChapter:	'Selecione um capítulo para ler:',
	noNextChapter:	'Próximo capítulo não existe.',
	noPrevChapter:	'Capítulo anterior não existe.',
	selectManga:	'Selecione um mangá para ler:',
	configs:		'Configurações',
	reading:		'Você está lendo:',
	allowClick:		'Permitir que clique mude de página.',
	changeSpeed:	'Alterar velocidade do movimento da página.'
}

$(document).ready(function(){
	
	$("#loading").hide();
	
	/* autoload do mangá */
	if(window.location.href.split("#")[1] != undefined) {
		var data		= window.location.href.split("#")[1].split("/");
		if(!data[2] || !data[3]) {
			// only load manga
			MANGA_NAME	= data[1];
			loadMangaData();
		}
		else {
			MANGA_NAME 	= data[1];
			CHAPTER		= data[2];
			PAGE		= Number(data[3]);
			loadMangaDataPurely();
			$("#bottom").hide();
		}
	}
	
	$("#manga-select a.manga").bind("click", function(){
		MANGA_NAME		= $(this).html();
		loadMangaData();
	})
	
	$("#more-info a").click(function(){
		togglePainel();
	})
	
	$("#manga").mousewheel(function(event, delta){
		
		var sWidth		= $("#manga").width(),
			sHeight		= $("#manga").height(),
			mWidth		= $("#manga img").width(),
			mHeight		= $("#manga img").height();
		
		if(animating) return;
			
		if(delta > 0) {
			// up
			var $pos		= Number($("#manga img").css('margin-top').replace('px', ''))
			if(mHeight < sHeight) return;
			if($pos == 45) return;
			_top	= $pos + SCROLLER_SPEED;
			if(_top > 45) _top = 45;
			animating = true;
			$("#manga img").animate({ marginTop: _top}, 400, function() { animating = false });
		} else {
			// down
			var $pos		= Number($("#manga img").css('margin-top').replace('px', ''));
			_limit	= -(mHeight - sHeight);
			if(mHeight < sHeight) return;
			if($pos == _limit) return;
			_top	= $pos - SCROLLER_SPEED;
			if(_top < _limit) _top = _limit;
			animating = true;
			$("#manga img").animate({ marginTop: _top}, 400, function() { animating = false });
		}
	})
	
	$(document).keydown(function(e){
		
		var sWidth		= $("#manga").width(),
			sHeight		= $("#manga").height(),
			mWidth		= $("#manga img").width(),
			mHeight		= $("#manga img").height();
			
		/* pula capitulos */
		if(e.shiftKey) {
			if(e.keyCode == "39") {
				nextPage();
			}
			if(e.keyCode == "37") {
				prevPage();
			}
			
			return;
		}
		
		// ESC
		if(e.keyCode == "27") {
			togglePainel();
		}
		
		// M
		if(e.keyCode == "77") {
			if($("#manga-select").css('display') == "block") {
				$("#manga-select").fadeOut();
			} else {
				$("#manga-select").html('<b>'+lang.loading+'</b>');
				$.get('functions.php', { load: 'mangas'}, function(obj){
					var html	=  "<b>"+lang.selectManga+"</b>";
					$.each(obj, function(i, v){
						html	+= '<a href="#/'+v+'" onclick="doManga(\''+v+'\')">'+v+'</a>';
					});
						html	+= '<b>--</b>';
						
					$("#manga-select").html(html);
				}, "json");
				$("#manga-select").fadeIn();
			}
		}
		
		if(animating) return;
			
		if(e.keyCode == "37") {
			// left
			var $pos		= Number($("#manga img").css('margin-left').replace('px', ''));
			if(mWidth < sWidth) return;
			if($pos == 0) return;
			_left	= $pos + SCROLLER_SPEED;
			if(_left > 0) _left = 0;
			animating = true;
			$("#manga img").animate({ marginLeft: _left}, 400, function() { animating = false });
		}
		if(e.keyCode == "38") {
			// up
			var $pos		= Number($("#manga img").css('margin-top').replace('px', ''))
			if(mHeight < sHeight) return;
			if($pos == 45) return;
			_top	= $pos + SCROLLER_SPEED;
			if(_top > 45) _top = 45;
			animating = true;
			$("#manga img").animate({ marginTop: _top}, 400, function() { animating = false });
		}
		if(e.keyCode == "39") {
			// right
			var $pos		= Number($("#manga img").css('margin-left').replace('px', ''));
			_limit	= -(mWidth - sWidth);
			if(mWidth < sWidth) return;
			if($pos == _limit) return;
			_left	= $pos - SCROLLER_SPEED;
			if(_left < _limit) _left = _limit;
			animating = true;
			$("#manga img").animate({ marginLeft: _left}, 400, function() { animating = false });
		}
		if(e.keyCode == "40") {
			// down
			var $pos		= Number($("#manga img").css('margin-top').replace('px', ''));
			_limit	= -(mHeight - sHeight);
			if(mHeight < sHeight) return;
			if($pos == _limit) return;
			_top	= $pos - SCROLLER_SPEED;
			if(_top < _limit) _top = _limit;
			animating = true;
			$("#manga img").animate({ marginTop: _top}, 400, function() { animating = false });
		}
		
	})
	
})

function togglePainel () {
	if($("#more-info a").html() == "+ Painel") {
		$("#more-info a").html('- Painel');
		$("#infos").animate({ marginTop: 0, speed: 50});
	} else {
		$("#more-info a").html('+ Painel');
		$("#infos").animate({ marginTop: -250, speed: 50});
	}
}

function doManga (manga) {
	MANGA_NAME	= manga;
	loadMangaData();
}

function nextPage() {
	var nPage		= PAGE + 1;
	if(nPage == MANGA[CHAPTER].images.length) {
		$.get("functions.php", { manga: MANGA_NAME, next_chapter: CHAPTER }, function(c){
			if(c == "") {
				alert(lang.noNextChapter);
			} else {
				CHAPTER	= c;
				PAGE	= 0;
				loadPage();
			}
		}, "html");
	}
	else if(MANGA[CHAPTER].images[nPage] != undefined) {
		PAGE		= nPage;
		loadPage();
	}
}

function prevPage() {
	var nPage		= PAGE - 1;
	if(nPage == -1) {
		$.get("functions.php", { manga: MANGA_NAME, prev_chapter: CHAPTER }, function(c){
			if(c == "") {
				alert(lang.noPrevChapter);
			} else {
				CHAPTER	= c;
				PAGE	= MANGA[CHAPTER].images.length - 1;
				loadPage();
			}
		}, "html");
	}
	else if(MANGA[CHAPTER].images[nPage] != undefined) {
		PAGE		= nPage;
		loadPage();
	}
}

function loadPage() {
	
	mountLeftMenu();
	
	if(!allowClickChangePage) {
		$("#manga").html("");
		$("#loading").fadeIn();
		$("<img />", {
			src: MANGA[CHAPTER].images[PAGE],
			load: function() {
				$("#loading").fadeOut();
			}
		}).appendTo("#manga");
	}
	else {
		$("#manga").html("");
		$("#loading").fadeIn();
		var a = $("<a />", {
			href: 'javascript:;',
			click: function() {
				nextPage();
			}
		});
		$("<img />", {
			src: MANGA[CHAPTER].images[PAGE],
			load: function() {
				$("#loading").fadeOut();
			}
		}).appendTo(a);
		a.appendTo("#manga");
	}
	
	window.location.href	= "#/"+MANGA_NAME+"/"+MANGA[CHAPTER].title+"/"+PAGE;
	$("#topo #text").html(MANGA_NAME+ " - "+MANGA[CHAPTER].title+" | "+Number(Number(PAGE)+1)+"/"+MANGA[CHAPTER].images.length);
}

function mountLeftMenu() {
	var left	=  "<h2>"+lang.reading+" "+MANGA_NAME+"</h2>";
		left	+= '<p>';
		left	+= '<select onchange="setManga(this.value);">';
		$.each(CHAPTERS, function(index, obj){
			if(obj == CHAPTER)
				left+= '<option value="'+obj+'" selected="selected">'+obj+'</option>';
			else
				left+= '<option value="'+obj+'">'+obj+'</option>';
		});
		left	+= '</select>';
		left	+= ' ';
		left	+= '<select onchange="setPage(this.value);">';
		$.each(MANGA[CHAPTER].images, function(i, obj){
			obj		= obj.split("/");
			obj		= obj[obj.length-1];
			if(i == PAGE)
				left+= '<option value="'+i+'" selected="selected">'+obj+'</option>';
			else
				left+= '<option value="'+i+'">'+obj+'</option>';
		});
		left	+= '</select>';
		left	+= '</p>';
		left	+= '<h2>'+lang.configs+'</h2>';
		left	+= '<p>';
		if(allowClickChangePage)
			left	+= '<label><input type="checkbox" onclick="toggleClickPage(this.checked)" checked="checked" /> '+lang.allowClick+'</label>';
		else
			left	+= '<label><input type="checkbox" onclick="toggleClickPage(this.checked)" /> '+lang.allowClick+'</label>';
		left	+= '</p>';
		left	+= '<p>';
		left	+= '<input type="text" size="3" onchange="setSpeed(this.value);" value="'+SCROLLER_SPEED+'" /> '+lang.changeSpeed;
		left	+= '</p>';
	$("#infos #left").html(left);
}

function setManga(c) {
	CHAPTER = c;
	PAGE	= 0;
	loadPage();
}

function setPage(p) {
	PAGE	= Number(p);
	loadPage();
}

function setSpeed(speed) {
	SCROLLER_SPEED = Number(speed);
}

function toggleClickPage(value) {
	allowClickChangePage	= value;
	loadPage();
}

function loadManga (v) {
	$("#manga-select").fadeOut();
	$("#bottom").fadeOut();
	
	CHAPTER		= v;
	PAGE		= 0;
	
	loadPage();
	$.preloadImages(MANGA[CHAPTER].images);
}

function loadMangaData () {
	$("#topo #text").html(MANGA_NAME);
	$("#manga-select").html('<b>'+lang.loading+'</b>');
	$.get("functions.php", { load_manga: MANGA_NAME }, function(data){
		MANGA		= [];
		CHAPTERS	= [];
		html		= "<b>"+lang.selectChapter+"</b>";
		$.each(data, function(v, i){
			MANGA[i.title]	= { title: i.title, images: i.images.sort() };
			CHAPTERS.push(i.title);
			html	+= '<a href="#/'+MANGA_NAME+'/'+i.title+'/0" class="chapter" onclick="loadManga(\''+i.title+'\')">'+i.title+'</a>';
		});
		html	+= '<b>--</b>';
			
		$("#manga-select").html(html);
	}, "json");
}

function loadMangaDataPurely() {
	$("#topo #text").html(MANGA_NAME);
	$("#manga-select").hide();
	$.get("functions.php", { load_manga: MANGA_NAME }, function(data){
		MANGA		= [];
		CHAPTERS	= [];
		$.each(data, function(v, i){
			MANGA[i.title]	= { title: i.title, images: i.images };
			CHAPTERS.push(i.title);
		});
		loadPage();
		$.preloadImages(MANGA[CHAPTER].images);
	}, "json");
}