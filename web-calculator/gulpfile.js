var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    connect = require('gulp-connect')
    del = require('del');

// out-of-time
/* gulp.task('styles', function() {
    return gulp.src('styles/*.scss')
      .pipe(sass({ style: 'compressed' }))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(minifycss())
      .pipe(gulp.dest('css/'))
}); */

gulp.task('styles', function () {
	return sass('styles/*.scss', {
        style: 'compressed'
    })
        .pipe(gulp.dest('publish/css/'))
    }
);

gulp.task('copy-html', function () {
    return gulp.src(['*.html'])
      .pipe(gulp.dest('publish'))
      .pipe(connect.reload());
});

gulp.task('copy-js', function() {
    return gulp.src(['scripts/*.js'])
        .pipe(gulp.dest('publish/scripts'))
        .pipe(connect.reload());
});

gulp.task('webserver', function() {
    return connect.server({
        root: 'publish/',
        livereload: true,
        port: 7777
    });
});

gulp.task('watch', function() {
    gulp.watch('styles/*.scss', ['styles']);
    gulp.watch('*.html', ['copy-html']);
    gulp.watch('scripts/calculator.js', ['copy-js']);
});

gulp.task('clean', function() {
    del(['publish/**/*']);
});

gulp.task('dev', ['styles', 'copy-html', 'copy-js', 'webserver', 'watch']);

gulp.task('default', ['dev']);
