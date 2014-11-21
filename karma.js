var gulp = require('gulp');
var karma = require('gulp-karma');

module.exports = function (opts) {
    var karmaConf;
    require(opts.karmaConfPath)({
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
            cache: {}, packageCache: {}, fullPaths: true, debug: true
        };
        opts.browserify.transform = [];
        if (opts.transforms) {
            opts.browserify.transform.concat(opts.transforms);
        }
        if (opts.coverage) {
            opts.browserify.transform.push('browserify-istanbul');
        }
        console.log(opts.browserify.transform);
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
