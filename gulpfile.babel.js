'use strict';

import gulp from 'gulp';
import source from 'vinyl-source-stream';
import livereload from 'gulp-livereload';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-ruby-sass';
import minifycss from 'gulp-minify-css';
import minifyhtml from 'gulp-minify-html';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import browserify from 'browserify';
import babelify from 'babelify';

gulp.task('default', () => {
  var tasks = ['html', 'styles', 'scripts', 'fonts', 'images', 'watch'];

  gulp.start(tasks);
});

gulp.task('html', () => {
  return gulp.src('source/*.html').
    pipe(minifyhtml()).
    pipe(gulp.dest('dist'));
});

gulp.task('styles', () => {
  return sass('source/**/main.scss', { style: 'expanded' }).
    on('error', sass.logError).
    pipe(autoprefixer('last 2 version')).
    pipe(gulp.dest('dist')).
    pipe(rename({suffix: '.min'})).
    pipe(minifycss()).
    pipe(gulp.dest('dist'));
});

gulp.task('scripts', () => {
  return browserify(
    { 
      entries: 
        [
          'source/scripts/main.js', 
          'source/scripts/photoService.js', 
          'source/scripts/galleryService.js'
        ], 
      debug: true 
    }
  ).
  transform(babelify).
  bundle().
  pipe(source('bundle.js')).
  pipe(gulp.dest('dist/scripts/'));
});

gulp.task('fonts', () => {
  return gulp.src('bower_components/Ionicons/fonts/*').
    pipe(gulp.dest('dist/fonts/'));
});

gulp.task('images', () => {
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
    pipe(gulp.dest('dist/images'));
});

gulp.task('watch', () => {
  gulp.watch('source/*.html', ['html']);
  gulp.watch('source/**/*.scss', ['styles']);
  gulp.watch('source/scripts/**/*.js', ['scripts']);
  gulp.watch('source/images/*', ['images']);

  livereload.listen();

  gulp.watch(['dist/**']).on('change', livereload.changed);
});