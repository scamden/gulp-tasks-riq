'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var livereloadServer = livereload(config.ports.livereloadServer);

module.exports = function (opts) {
    return gulp.task('watch', function () {
        gulp.watch(opts.livereload).on('change', function (file) {
            livereloadServer.changed(file.path);
        });

        watch({glob: opts.scripts}, ['lint']);
        watch({glob: opts.index}, ['index']);
        watch({glob: opts.templates}, ['templates']);
        watch({glob: opts.styles}, ['styles']);
        watch({glob: opts.tests}, ['karma']);
    });  
};
