'use strict';

var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var shell = require('gulp-shell');

module.exports = function (opts) {
    gulp.task('clean', function () {
        var folder = opts.releaseFolder;
        return gulp.src(folder, {read: false})
            .pipe(shell(['git ls-files -z ' + folder + '/ | xargs -0 git update-index --assume-unchanged']))
            .pipe(rimraf());
    });
};
