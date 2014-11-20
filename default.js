'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prebuild', ['index', 'styles', 'images', 'assets', 'templates', 'lint']);

gulp.task('watchServe', ['watch', 'serve']);


module.exports = function (opts) {
    return gulp.task('default', function (cb) {
        if (opts.release) {
            runSequence(
                'clean',
                'prebuild',
                'browserify-omega',
                'minify',
                cb
            );
        } else {
            runSequence(
                'clean',
                'prebuild',
                'browserify-omega',
                'watchServe',
                cb
            );
        }
    });
};
