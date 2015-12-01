import gulp from 'gulp';

gulp.task('build', ['jade', 'browserify', 'sass']);

gulp.task('build:watch', ['jade:watch', 'browserify:watch', 'sass:watch']);
