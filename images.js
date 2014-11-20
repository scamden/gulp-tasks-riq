'use strict';

var gulp = require('gulp');

module.exports = function (opts) {
    gulp.task('images', function () {
        return gulp.src(opts.src)
            .pipe(gulp.dest(opts.dest));
    });
};
