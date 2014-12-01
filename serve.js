'use strict';

var gulp = require('gulp');
var connect = require('connect');
var serveStatic = require('serve-static');
var staticServer = connect();

module.exports = function (opts) {
    return gulp.task('serve', function (cb) {
        // use(connect.static(opts.serverPath))
        staticServer.use(serveStatic(opts.serverPath)).listen(process.env.PORT || opts.port, cb);
    });
};
