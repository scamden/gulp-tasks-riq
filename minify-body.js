'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');

module.exports = function (opts) {
	return gulp.src(opts.src)
	    .pipe(ngAnnotate())
	    .pipe(uglify({mangle: false}))
	    .pipe(rename({suffix: (opts.version || '') + '.min'}))
	    .pipe(gulp.dest(opts.dest));
};