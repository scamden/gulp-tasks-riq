var gulp = require('gulp');
var karma = require('gulp-karma');
var run = require('run-sequence');

gulp.task('tests', function () {
    global.tests = true;
    run('clean', 'templates', 'lint', 'browserify-omega', 'watch');
});

gulp.task('testNoWatch', function (cb) {
    global.tests = true;
    run('clean', 'templates', 'lint', 'browserify-omega', 'karma', function () {
        global.tests = false;
        cb();
    });
});