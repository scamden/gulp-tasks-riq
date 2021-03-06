'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var minifyBody = require('./minify-body');

module.exports = function (opts) {
    return gulp.task('minify', function () {
        return minifyBody(opts);
    });

};