'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function (opts) {
    return gulp.task('lint', function () {
        return gulp.src(opts.src);
        //.pipe(jshint())
        //.pipe(jshint.reporter(stylish));
    });  
};
