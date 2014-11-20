'use strict';

var gulp = require('gulp');
var connect = require('connect');
var staticServer = connect();

module.exports = function (opts) {
    return gulp.task('serve', function () {
        staticServer.use(connect.static(opts.serverPath)).listen(process.env.PORT || config.ports.staticServer, next);
    });  
};
