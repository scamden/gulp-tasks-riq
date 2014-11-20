var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
    runSequence = require('run-sequence'),
    es = require('event-stream')
shell = require('gulp-shell');

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


gulp.task('tagCommit', function () {
    return gulp.src(config.paths.package)
        .pipe(shell(['git ls-files -z release/ | xargs -0 git update-index --no-assume-unchanged',
            'git add --all',
            'git commit -am "bumps package version"',
            'git ls-files -z release/ | xargs -0 git update-index --assume-unchanged'
        ]))
        .pipe(filter(config.paths.package))
        .pipe(tag_version()) // tag it in the repository 
        .pipe(git.push('origin', 'master', {args: '--tags'})) // push the tags to master
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
    return gulp.src(config.paths.package) // get all the files to bump version in
        .pipe(bump({type: importance})) // bump the version number in those files
        .pipe(gulp.dest('./'));  // save it back to filesystem
});

var importance;

function inc(imp) {
    importance = imp;
    global.release = true;
    runSequence('pullRebase', 'testNoWatch', 'bump', 'default', 'tagCommit');
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