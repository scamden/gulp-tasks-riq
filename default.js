'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prebuild', ['index', 'styles', 'images', 'assets', 'templates', 'lint']);

gulp.task('prebuild-release', ['index-release', 'styles', 'images', 'assets', 'templates-release', 'lint']);

gulp.task('watchServe', ['watch', 'karma-watch', 'serve']);

gulp.task('release', function (cb) {
    runSequence(
        'clean',
        'prebuild-release',
        'browserify-omega',
        'minify',
        cb
    );
});

module.exports = function (opts) {
    return gulp.task('default', function (cb) {
        runSequence(
            'clean',
            'prebuild',
            'browserify-omega',
            'watchServe',
            cb
        );
    });
};
