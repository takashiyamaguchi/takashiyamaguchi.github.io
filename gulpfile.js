// module
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var ssi          = require('browsersync-ssi');
var cssnext      = require('postcss-cssnext');

// ディレクトリ : srcがinput distがoutput
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
var dir = {
  src: {
    css  : 'src/css',
    js   : 'src/js',
    aigis: 'src/aigis'
  },
  dist: {
    css  : 'dist/css',
    js   : 'dist/js',
    aigis: 'dist/aigis'
  }
};

// ローカルサーバ立ち上げ、watch
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
gulp.task('serve', ['css'], function() {

    browserSync.init({
        server: {
        	baseDir: "./dist/"
        }
    });

    gulp.watch("./src/css/**/*.scss", ['css']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});

// sassのコンパイル & autoprefix
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
gulp.task('css', function() {
    var processors = [
        cssnext({browser: [
          'last 2 versions', // 最新２バージョン
          'ie >= 10',        // IE10以上
          'iOS >= 8',        // iOS8以上
          'Android >= 4'     // Android4以上
        ]})
    ];
    return gulp.src("./src/css/**/*.scss")
        .pipe(sourcemaps.init())
            .pipe(sass()).on('error', sass.logError)
            .pipe(postcss(processors))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(dir.dist.css))
        .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);










