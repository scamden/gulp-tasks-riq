module.exports = function (opts) {
    var gulp = require('gulp');
    var run = require('run-sequence');

    gulp.task('tests', function () {
        run('clean', 'templates', 'lint', 'browserify-omega', 'watch');
    });

    gulp.task('testNoWatch', function (cb) {
        run('clean', 'templates', 'lint', 'browserify-omega', 'karma', cb);
    });
};