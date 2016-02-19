//windowの変数定義
var $window = window;
 
//ボタンエフェクトの関数
function buttonEffect(){

	//対象となるボタンの変数
	var $buttonEffect = $('.js-effect');

	//button押した時の挙動
	$buttonEffect.on('click',function(e){

		//もともとの機能を中断させる
		e.preventDefault();
	
		//波紋のアニメーションになる要素を追加
		$(this).append('<span></span>');

		/*追加した部分▼*/

		var $span = $(this).find('span'),　//波紋アニメーションの変数
			offSet = $(this).offset(), //ボタンの位置を取得
			offSetY = event.pageY-offSet.top, //縦のボタンの位置と押した時の座標を計算
			offSetX = event.pageX-offSet.left;　//横のボタンの位置と押した時の座標を計算

		　//波紋アニメーションに計算した座標のポジションを代入
		$span.css({
			top:offSetY,
			left:offSetX
		});

		/*追加した部分▲*/


		//波紋アニメーションの変数を定義
		var $span = $(this).find('span');

		//波紋アニメーションを1.8秒表示させてから要素を消す
		$window.setTimeout(function(){
			$span.remove();
		},1800);
	});
}
 
//イベントの実行
buttonEffect();