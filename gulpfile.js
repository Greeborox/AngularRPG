var gulp = require('gulp');
var webserver = require('gulp-webserver');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var watch = require('gulp-watch');

gulp.task('build', function() {
  watch('./src/app/**/*.js', function(){
    gulp.src('./index.html')
    .pipe(inject(
      gulp.src('./src/app/**/*.js')
      .pipe(angularFilesort())
    ))
    .pipe(gulp.dest('./'));
  })
});
gulp.task('webserver', ['build'], function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('serve', ['build', 'webserver']);
