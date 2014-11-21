var gulp = require('gulp');
var karma = require('gulp-karma');

module.exports = function (taskOpts) {
    var karmaConf;
    require(taskOpts.karmaConfPath || 'karma.conf.js')({
        set: function (opts) {
            karmaConf = opts;
            opts.browserify = {
                cache: {}, packageCache: {}, fullPaths: true, debug: true
            };
            opts.browserify.transform = taskOpts.transforms || [];
            if (taskOpts.coverage) {
                opts.browserify.transform.push('browserify-istanbul');
            }

            opts.files = opts.files || [];
            opts.preprocessors = opts.preprocessors || {};
            if (taskOpts.testGlobs) {
                taskOpts.testGlobs.forEach(function (glob) {
                    opts.files.push(glob);
                    opts.preprocessors[glob] = ['browserify'];
                });
            }
        }
    });

    function setupKarmaOpts(action) {
        karmaConf.action = action;
        return karmaConf;
    }

    gulp.task('karma-watch', function () {
        return gulp.src(karmaConf.files)
            .pipe(karma(setupKarmaOpts('watch')));
    });

    //arbitrarily pick karma as the export
    return gulp.task('karma', function () {
        return gulp.src(karmaConf.files)
            .pipe(karma(setupKarmaOpts('run')));
    });
};
