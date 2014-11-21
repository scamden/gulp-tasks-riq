var gulp = require('gulp');

gulp.task('release', function (cb) {
    cb();
});

gulp.task('testsNoWatch', function (cb) {
    cb();
});


require('./version')();