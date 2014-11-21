'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var minifyHTML = require('gulp-minify-html');

function doIndex(opts) {
    return gulp.src(opts.src)
        .pipe(gulpif(opts.minify, minifyHTML({comments: true, empty: true, spare: true, quotes: true})))
        .pipe(replace('<!--styles-->', '<link href="' + opts.styles + '" rel="stylesheet">'))
        .pipe(replace('<!--scripts-->', '<script src="' + opts.scripts + '"></script>'))
        .pipe(gulp.dest(opts.dest));
}

module.exports = function (opts) {
    gulp.task('index', function () {
        return doIndex(opts);
    });

    gulp.task('index-release', function () {
        opts.minify = true;
        return doIndex(opts);
    });

};