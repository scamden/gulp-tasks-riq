'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var templateCache = require('gulp-angular-templatecache');
var header = require('gulp-header');
var minifyHTML = require('gulp-minify-html');
var path = require('path');


module.exports = function (opts) {
  return gulp.task('templates', function () {
      return gulp.src(opts.src)
          .pipe(gulpif(opts.minify, minifyHTML({empty: true, spare: true, quotes: true})))
          .pipe(templateCache({
              standalone: true, base: function (file) {
                  return path.basename(file.path);
              }
          }))
          .pipe(header('module.exports = '))
          .pipe(gulp.dest(opts.dest));
  });
};