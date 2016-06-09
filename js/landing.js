$(document).foundation();


// ランディング

var hoge = function(){
	var 
		illust = $('.author'),
		illustHeight = illust.height(),
		illustWidth = illust.width(),
		zurashiFirst = illustWidth / 4 * 3,
		zurashiThird = illustWidth / 4,
		zurashiFourth = illustWidth / 4 * 2,
		lineFirst = $('.one'),
		lineSecond = $('.two'),
		lineThird = $('.three'),
		lineFourth = $('.four')
	;

	console.log('高さは' + illustHeight);
	console.log('横幅は' + illustWidth);
	console.log('ずらし01は' + zurashiFirst);
	console.log('ずらし02は' + zurashiThird);
	console.log('ずらし03は' + zurashiFourth);

	$(function(){

		lineFirst.css('top', zurashiFirst);

		lineThird.css('top', zurashiThird);

		lineFourth.css('top', zurashiFourth);
	});

	// 正方形の中に名前を隠す
	// 正方形のエリアを図って決定
	illust.css('height', illustWidth);
};

$(function(){
	hoge();
	$(window).on('resize', hoge);
});

// LazyLoad

// LazyLoad起動

$(function(){
	$('img.lazy').lazyload({
		threshold: 200,
		// event: "mouseover",
		effect: "fadeIn",
		effect_speed: 1000,
	});
});











































