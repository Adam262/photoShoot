var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');

gulp.task('default', function() {
  var tasks = ['styles', 'images', 'scripts', 'watch'];

  gulp.start(tasks);
});

gulp.task('styles', function() {
  return sass('source/**/main.scss', { style: 'expanded' }).
    on('error', sass.logError).
    pipe(autoprefixer('last 2 version')).
    pipe(gulp.dest('dist')).
    pipe(rename({suffix: '.min'})).
    pipe(minifycss()).
    pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
  return gulp.src('source/scripts/**/*.js').
    pipe(concat('main.js')).
    pipe(gulp.dest('dist/scripts')).
    pipe(rename({suffix: '.min'})).
    pipe(uglify()).
    pipe(gulp.dest('dist/scripts'));
});

gulp.task('images', function(){
  return gulp.src('source/images/*').
    pipe(cache(
      imagemin(
        { 
          optimizationLevel: 5, 
          progressive: true, 
          interlaced: true 
        }
      )
    )).
    pipe(gulp.dest('dist/images'))
});

gulp.task('watch', function() {
  gulp.watch('source/**/*.scss', ['styles']);
  gulp.watch('source/scripts/**/*.js', ['scripts']);
  gulp.watch('source/images/*', ['images']);

  livereload.listen();

  gulp.watch(['dist/**']).on('change', livereload.changed);
});