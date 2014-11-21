var gulp = require('gulp');
var karma = require('gulp-karma');

module.exports = function (taskOpts) {
    var karmaConf;
    require(taskOpts.karmaConfPath)({
        set: function (conf) {
            karmaConf = conf;
        }
    });

    function setupKarmaOpts(action) {
        var opts = {
            configFile: 'karma.conf.js',
            action: action
        };
        opts.browserify = {
            cache: {}, packageCache: {}, fullPaths: true, debug: true,
            prebundle: function (bundle) {
                var aliasify = require('aliasify').configure({
                    "aliases": {
                        "@uiQ": "./src/modules",
                        "@util": "./src/modules/util",
                        "@tmp": "./tmp"
                    }
                });
                bundle.transform(aliasify);
            }

        };
        opts.browserify.transform = [];
        if (taskOpts.transforms) {
            opts.browserify.transform.concat(taskOpts.transforms);
        }
        if (taskOpts.coverage) {
            opts.browserify.transform.push('browserify-istanbul');
        }
        return opts;
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
