'use strict';

// module
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var aigis        = require('gulp-aigis');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var ssi          = require('browsersync-ssi');
var cssnext      = require('postcss-cssnext');
var runSequence  = require('run-sequence');


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
gulp.task('serve', function() {

    browserSync.init({
        server: {
        	baseDir: "./dist/"
        }
    });

    // gulp.watch("./src/css/**/*.scss", ['css']);
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
            .pipe(sass({
              outputStyle: 'expanded'
            })).on('error', sass.logError)
            .pipe(postcss(processors))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(dir.dist.css))
        .pipe(browserSync.stream());
});


// スタイルガイドの作成
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
gulp.task('aigis:css', function() {
  var processors = [
      cssnext({browser: [
        'last 2 versions', // 最新２バージョン
        'ie >= 10',        // IE10以上
        'iOS >= 8',        // iOS8以上
        'Android >= 4'     // Android4以上
      ]})
  ];
  return gulp.src("./src/css/**/*.scss")
    .pipe(sass({
      outputStyle: 'expanded',
    })).on('error', sass.logError)
    .pipe(postcss(processors))
    .pipe(gulp.dest(dir.dist.aigis + '/aigis_assets/css'));
});


// スタイルガイドの作成
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
gulp.task('aigis:update', function() {
  return _aigis();
});
gulp.task('aigis:build', function() {
  return _aigis();
});
function _aigis() {
  return gulp.src(dir.src.aigis + '/aigis_config.yml')
    .pipe(aigis())
    .on('end', function() {
      runSequence('aigis:css');
    });
}


// watch系のタスク
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
gulp.task('watch', function() {
  gulp.watch([dir.src.css + '/**/*.scss'], function() {
    runSequence('css', 'aigis:update');
  });

  gulp.watch([dir.src.aigis + '/**/*.ejs'], function() {
    runSequence('aigis:update');
  });

  gulp.watch([dir.src.aigis + '/aigis_assets/css/**/*.scss'], function() {
    runSequence('aigis:css');
  });
});


gulp.task('default', ['watch', 'serve']);