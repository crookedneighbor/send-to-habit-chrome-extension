import gulp from 'gulp';
import sass from 'gulp-sass';

gulp.task('sass', () => {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./extension/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});
