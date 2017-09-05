var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');

gulp.task('default',['browser-sync'] ,function(){
	console.log("gulp 起動");
	gulp.watch('./src/scss/**/*.scss', ['sass']);
	gulp.watch('./**/*.html', ['bs-reload']);
	gulp.watch('./src/css/', ['bs-reload']);
});

gulp.task('sass', function(){
	return gulp.src('./src/scss/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		})
		.on('error', sass.logError)
		)
		.pipe(sourcemaps.init())
        .pipe(autoprefixer({
        	browsers: [
        		'last 3 version',
        		'ie >= 9',
        		'iOS >= 8',
        		'Android >= 4'
        	],
        	cascade: false
        }))
        .pipe(sourcemaps.write('../maps/'))
		.pipe(gulp.dest('./src/css'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./",
			index: "index.html"
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});


