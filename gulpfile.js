var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['css'], function() {

    browserSync.init({
        server: {
        	baseDir: "./dist/"
        }
    });

    gulp.watch("./src/css/**/*.scss", ['css']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('css', function() {
    return gulp.src("./src/css/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/css/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);