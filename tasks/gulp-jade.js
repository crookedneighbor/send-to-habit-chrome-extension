import gulp from 'gulp';
import jade from 'gulp-jade';

gulp.task('jade', () => {
  gulp.src('./src/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./extension/views'));
});

gulp.task('jade:watch', () => {
  gulp.watch('./src/views/**/*.jade', ['jade']);
});
