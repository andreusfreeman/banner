var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'concat'], function() {

    browserSync.init({
        server: "src"
    });

    gulp.watch("src/style/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch('src/script/*.js', ['concat']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/style/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
gulp.task('concat', function() {
  return gulp.src('src/script/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('src/js/'));
});

gulp.task('default', ['serve']);
