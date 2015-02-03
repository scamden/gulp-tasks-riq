module.exports = function (taskOpts) {
    var createBundle, createBundles;
    var through = require('through2');

    var gulp = require('gulp');

    var browserify = require('browserify');

    var watchify = require('watchify');

    var source = require('vinyl-source-stream');

    var path = require('path');

    var exorcist = require('exorcist');

    require('colors');

    var files = taskOpts.bundleConfigs;


    createBundle = function (bundleOpts, isWatching, cb) {
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
                bundler.transform(transform);
            });
        }

        //this puts a semicolon right before the source maps comment, sorta annoying but works
        bundler.pipeline.get('wrap').push(through.obj(function (row, enc, next) {
            this.push(new Buffer(row.toString().replace('//# sourceMappingURL=', ';\n//# sourceMappingURL=')));
            next();
        }));


        rebundle = function () {
            var startTime;
            startTime = new Date().getTime();
            var bundleStream = bundler.bundle().on('error', function () {
                return console.log(arguments);
            });

            if(taskOpts.exorcise){
                bundleStream = bundleStream.pipe(exorcist(path.join(destination, name + '.map')));
            }
            bundleStream = bundleStream.pipe(source(name));

            bundleStream = bundleStream.pipe(gulp.dest(destination).on('end', function () {
                var time;
                time = (new Date().getTime() - startTime) / 1000;
                cb();
                return console.log('' + name.cyan + ' was browserified: ' + (time + 's').magenta);
            }));

            return bundleStream;
            
        };
        if (isWatching) {
            bundler.on('update', rebundle);
        }
        return rebundle();
    };

    return function createBundles(isWatching, cb) {
        var bundles = files;
        //i feel so dirty for this hack but it works, and it's the best i can find right now
        var numBundles = bundles.length;
        return bundles.forEach(function (bundle) {
            return createBundle(bundle, isWatching, function () {
                numBundles--;
                if (numBundles === 0) {
                    cb();
                }
            });
        });
    };
}