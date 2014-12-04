var gulp = require('gulp');
var karma = require('karma').server;

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
        if (action === 'watch') {
            karmaConf.singleRun = false;
        } else {
            karmaConf.singleRun = true;
        }
        return karmaConf;
    }

    gulp.task('karma-watch', function (cb) {
        karma.start(setKarmaOptsAction('watch'), cb);
    });

    //arbitrarily pick karma as the export
    return gulp.task('karma', function (cb) {
        karma.start(setKarmaOptsAction('run'), cb);
    });
};
