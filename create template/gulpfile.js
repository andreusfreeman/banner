'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var concat = require('gulp-concat');

gulp.task('concat', function() {
  return gulp.src('angular/dest/*.js')
    .pipe(concat('controllers.js'))
    .pipe(gulp.dest('angular/'));
});

// var connect = require('gulp-connect-php');
//
// gulp.task('connect', function() {
//     connect.server();
// });
//
// gulp.task('php', ['connect']);

gulp.task('sprite', function () {
  var spriteData = gulp.src('sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('sprite'));
});
gulp.task('default', function () {
	return gulp.src('style/style.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist'));
});
gulp.task('compress', function (cb) {
  pump([
        gulp.src('js/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
gulp.task('sass', function () {
  return gulp.src('styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch('styles/*.scss', ['sass']);
});
gulp.task('concat:watch', function () {
  gulp.watch('angular/dest/*.js', ['concat']);
});
