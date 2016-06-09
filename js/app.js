$(document).foundation();


// jquery.balloon.js
// #regist01
$(function(){
	$('#regist01').balloon({
		contents:'test'
	});
});

// #regist02
$(function(){
	$('#regist02').balloon({
		position: 'bottom',
		minLifetime: 3000,
		contents: '<a href="#">無料会員登録</a>で参加作家の<br />過去作品を全て見れます！',
		css: {
			padding: '0.75rem',
			opacity: '1' ,
			boxShadow: '1px 1px 2px rgba(0, 0, 0, .3)'
		}
	});
});

// #glovalContainer

var
	win = $(window),
	winHeight = win.height(),
	winWidth = win.width(),
	container = $('#glovalContainer')
;

console.log(win);
console.log('高さは' + winHeight);
console.log('幅は' + winWidth);

$(function(){
	container.css('height', winHeight);
});