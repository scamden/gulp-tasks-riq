var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tagVersion = require('gulp-tag-version'),
    runSequence = require('run-sequence'),
    shell = require('gulp-shell')

    ;

/**
 * Bumping version number.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch   # makes v0.1.0 → v0.1.1
 *     gulp minor   # makes v0.1.1 → v0.2.0
 *     gulp major   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch or
 * introduced a minor or major (backwards-incompatible) feature.
 */

module.exports = function (opts) {
    opts = opts || {};
    var packageJson = opts.packageJson || 'package.json';
    gulp.task('tagCommit', function () {

        return gulp.src(packageJson)
            .pipe(shell([
                'git add --all',
                'git commit -am "bumps package version"'
            ]))
            .pipe(filter(packageJson))
            .pipe(tagVersion()) // tag it in the repository 
            .pipe(git.push('origin', 'master', {args: '--tags'})) // push the tags to master
            .pipe(shell(['echo publishing to npm...', 'npm publish', 'echo published']))
            ;
    });

    gulp.task('pullRebase', function (cb) {
        git.pull('origin', 'master', {args: '--rebase'}, function (err) {
            if (err) {
                throw err;
            } else {
                cb();
            }
        });
    });

    gulp.task('bump', function () {
        return gulp.src(packageJson) // get all the files to bump version in
            .pipe(bump({type: importance})) // bump the version number in those files
            .pipe(gulp.dest('./'));  // save it back to filesystem
    });

    var importance;

    function inc(imp) {
        importance = imp;
        runSequence('pullRebase', 'testsNoWatch', 'bump', 'release', 'tagCommit');
    }

    gulp.task('patch', function () {
        return inc('patch');
    });
    gulp.task('minor', function () {
        return inc('minor');
    });
    gulp.task('major', function () {
        return inc('major', true);
    });
};
