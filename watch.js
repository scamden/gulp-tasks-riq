'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');


module.exports = function (opts) {
    var livereloadServer = livereload(opts.port);
    return gulp.task('watch', function () {
        gulp.watch(opts.livereload).on('change', function (file) {
            livereloadServer.changed(file.path);
        });

        watch({glob: opts.scripts}, ['lint']);
        watch({glob: opts.index}, ['index']);
        watch({glob: opts.templates}, ['templates']);
        watch({glob: opts.styles}, ['styles']);
    });
};
