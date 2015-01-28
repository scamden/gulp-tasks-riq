var gulp = require('gulp');

module.exports = function (taskOpts) {

    var createBundles = require('./browserify-multi')(taskOpts);

    gulp.task('browserify-omega', function (cb) {
        createBundles(false, cb);
    });

    gulp.task('watchify-omega', function (cb) {
        createBundles(true, cb);
    });
};
