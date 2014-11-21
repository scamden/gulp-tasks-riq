module.exports = function (taskOpts) {
    var createBundle, createBundles;
    var through = require('through2');

    var gulp = require('gulp');

    var browserify = require('browserify');

    var watchify = require('watchify');

    var source = require('vinyl-source-stream');

    require('colors');

    var files = taskOpts.bundleConfigs;


    createBundle = function (bundleOpts, cb) {
        var isWatching = !global.release;
        var bundler, rebundle;

        //pull off our unique options so we can pass the rest to browserify
        var name = bundleOpts.output;
        var destination = bundleOpts.dest || taskOpts.dest;
        bundleOpts.output = undefined;
        bundleOpts.dest = undefined;

        if (isWatching) {
            bundleOpts.cache = {};
            bundleOpts.packageCache = {};
            bundleOpts.fullPaths = true;
        }
        bundleOpts.debug = true;
        bundler = browserify(bundleOpts);

        if (isWatching) {
            bundler = watchify(bundler);
        }

        if (taskOpts.transforms) {
            taskOpts.transforms.forEach(function (transform) {
                console.log('adding transform');
                bundler.transform(transform);
            });
        }

        var aliasify = require('aliasify');
        bundler.transform(aliasify);

        //this puts a semicolon right before the source maps comment, sorta annoying but works
        bundler.pipeline.get('wrap').push(through.obj(function (row, enc, next) {
            this.push(new Buffer(row.toString().replace('//# sourceMappingURL=', ';\n//# sourceMappingURL=')));
            next();
        }));


        rebundle = function () {
            var startTime;
            startTime = new Date().getTime();
            return bundler.bundle().on('error', function () {
                return console.log(arguments);
            }).pipe(source(name)).pipe(gulp.dest(destination).on('end', function () {
                var time;
                time = (new Date().getTime() - startTime) / 1000;
                cb();
                return console.log('' + name.cyan + ' was browserified: ' + (time + 's').magenta);
            }));
        };
        if (isWatching) {
            bundler.on('update', rebundle);
        }
        return rebundle();
    };

    createBundles = function (bundles, cb) {
        //i feel so dirty for this hack but it works, and it's the best i can find right now
        var numBundles = bundles.length;
        return bundles.forEach(function (bundle) {
            return createBundle(bundle, function () {
                numBundles--;
                if (numBundles === 0) {
                    cb();
                }
            });
        });
    };

    gulp.task('browserify-omega', function (cb) {
        createBundles(files, cb);
    });

};
