'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');


module.exports = function (opts) {
    var livereloadServer = livereload(opts.port);
    return gulp.task('watch', function () {
        gulp.watch(opts.livereload).on('change', function (file) {
            livereloadServer.changed(file.path);
        });

        gulp.watch(opts.scripts, ['lint']);
        gulp.watch(opts.index, ['index']);
        gulp.watch(opts.templates, ['templates']);
        gulp.watch(opts.styles, ['styles']);
    });
};
