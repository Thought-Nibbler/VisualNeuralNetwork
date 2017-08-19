var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('browserify', function() {
    browserify('./client/scripts/main.js', { debug: true })
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .on('error', function (err) { console.log('Error : ' + err.message); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./client/'));
});

gulp.task('watch', function() {
    gulp.watch(['./client/*.html',
                './client/scripts/*.js',
                './client/css/*.css'],
               ['browserify']);
});

gulp.task('webserver', function() {
    gulp.src('./client/')
        .pipe(webserver({
            host: '127.0.0.1',
            livereload: true
        })
    );
});

gulp.task('default', ['browserify', 'webserver', 'watch']);
