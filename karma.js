var gulp = require('gulp');
var karma = require('gulp-karma');

module.exports = function (taskOpts) {
    var karmaConf = taskOpts.karmaConf;
    karmaConf.browserify = {
        cache: {}, packageCache: {}, fullPaths: true, debug: true
    };
    karmaConf.browserify.transform = taskOpts.transforms || [];
    if (taskOpts.coverage) {
        karmaConf.browserify.transform.push('browserify-istanbul');
    }

    karmaConf.files = karmaConf.files || [];
    karmaConf.preprocessors = karmaConf.preprocessors || {};
    if (taskOpts.testGlobs) {
        taskOpts.testGlobs.forEach(function (glob) {
            karmaConf.files.push(glob);
            karmaConf.preprocessors[glob] = ['browserify'];
        });
    }
    if (taskOpts.configure) {
        taskOpts.configure(karmaConf);
    }

    function setKarmaOptsAction(action) {
        karmaConf.action = action;
        return karmaConf;
    }

    gulp.task('karma-watch', function () {
        return gulp.src(karmaConf.files)
            .pipe(karma(setKarmaOptsAction('watch')));
    });

    //arbitrarily pick karma as the export
    return gulp.task('karma', function () {
        return gulp.src(karmaConf.files)
            .pipe(karma(setKarmaOptsAction('run')));
    });
};
