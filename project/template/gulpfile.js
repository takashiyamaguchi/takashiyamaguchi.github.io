'use strict';

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Import module
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

var gulp         = require('gulp');
var sass         = require('gulp-sass');
// var postcss      = require('gulp-postcss');
// var babel        = require('gulp-babel');
// var plumber      = require('gulp-plumber');
// var uglify       = require('gulp-uglify');
// var autoprefixer = require('autoprefixer');
// var cssnano      = require('cssnano');
// var aigis        = require('gulp-aigis');
var browserSync  = require('browser-sync');

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

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Sass to CSS
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

gulp.task('css', function(){
    return gulp.src('src/css/**/*.scss')
        .pipe(
            sass({
                outputStyle: 'expanded'
            })
        )
    .pipe(gulp.dest('dest/css/'));
});
gulp.task('js');
gulp.task('aigis:update');
gulp.task('aigis:build');
gulp.task('aigis:css');
gulp.task('aigis:js');
gulp.task('watch');
gulp.task('build');
gulp.task('server');
gulp.task('default');
gulp.task('');
gulp.task('');































