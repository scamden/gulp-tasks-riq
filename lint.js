'use strict';

var gulp = require('gulp');

module.exports = function (opts) {
    return gulp.task('lint', function () {
        return gulp.src(opts.src);
        //.pipe(jshint())
        //.pipe(jshint.reporter(stylish));
    });
};
