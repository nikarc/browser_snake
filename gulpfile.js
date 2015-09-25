var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    sourceMaps  = require('gulp-sourcemaps'),
    babel       = require('gulp-babel');
    
    
gulp.task('babel', function() {
  return gulp.src('./src/*.js')
          .pipe(sourceMaps.init())
          .pipe(babel())
          .pipe(sourceMaps.write('.'))
          .pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
  return gulp.src('./src/*.scss')
          .pipe(sass())
          .pipe(gulp.dest('./'));
});

gulp.task('watch', ['babel', 'sass'], function() {
  gulp.watch('./src/*.js', ['babel']);
  gulp.watch('./src/*.scss', ['sass']);
});