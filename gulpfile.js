'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifyHTML = require('gulp-minify-html');


gulp.task('workflow', function () {
  gulp.src('./src/client/app/sass/**/*.scss')
//    Insert tasks here
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(cssnano())
      .pipe(sourcemaps.write('./'))

      .pipe(gulp.dest('./build/assets/css/'))
});

// HTML
gulp.task('html', function() {
    var opts = {
        conditionals: true,
        spare: true
    };
    return gulp
        .src('./src/client/app/index.html')
        .pipe(minifyHTML(opts))
        // .pipe(rename('index.html'))
        .pipe(gulp.dest('./build/'));
});

// WATCHERS
gulp.task('default', function () {
    gulp.watch('./src/client/app/sass/**/*.scss', ['workflow']);
    gulp.watch(['./src/client/app/index.html'], ['html']);
});

