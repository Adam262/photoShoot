'use strict';

import gulp from 'gulp';
import livereload from 'gulp-livereload';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import sass from 'gulp-ruby-sass';
import minifycss from 'gulp-minify-css';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';

gulp.task('default', () => {
  var tasks = ['styles', 'images', 'scripts', 'watch'];

  gulp.start(tasks);
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
  return gulp.src('source/scripts/**/*.js').
    pipe(babel(
      {
        presets: ['es2015']
      }
    )).
    pipe(concat('main.js')).
    pipe(gulp.dest('dist/scripts')).
    pipe(rename({
      suffix: '.min'
    })).
    pipe(uglify()).
    pipe(gulp.dest('dist/scripts'));
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
    pipe(gulp.dest('dist/images'))
});

gulp.task('watch', () => {
  gulp.watch('source/**/*.scss', ['styles']);
  gulp.watch('source/scripts/**/*.js', ['scripts']);
  gulp.watch('source/images/*', ['images']);

  livereload.listen();

  gulp.watch(['dist/**']).on('change', livereload.changed);
});