var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');

/*
var paths = {
  'scss': 'scss',
  'css': 'css'
}
*/

gulp.task('sass', function(){
	gulp.src('scss/**/**.scss')
	.pipe(sass())
	.pipe(gulp.dest('./css')); // 出力先
});