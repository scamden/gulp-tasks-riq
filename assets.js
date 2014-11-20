'use strict';

var gulp = require('gulp');

module.exports = function(opts){
    return gulp.task('assets', function () {
        return gulp.src(opts.src)
            .pipe(gulp.dest(opts.dest));
    });  
};
