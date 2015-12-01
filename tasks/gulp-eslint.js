import gulp from 'gulp';
import eslint from 'gulp-eslint';

const SRC_FILES = [ './src/**/*.js' ];
const TEST_FILES = [ './test/**/*.js' ];
const TASK_FILES = [ './tasks/**/*.js' ];

let linter = (src, options) => {
  return gulp
    .src(src)
    .pipe(eslint(options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

gulp.task('lint:src', () => {
  return linter(SRC_FILES);
});

gulp.task('lint:tests', () => {
  let options = {
    rules: {
      'max-nested-callbacks': 0,
      'no-unused-expressions': 0,
      'mocha/no-exclusive-tests': 2,
      'mocha/no-global-tests': 2,
      'mocha/handle-done-callback': 2,
    },
    globals: {
      'expect': true,
      'sinon': true,
    },
    plugins: [ 'mocha' ],
  };

  return linter(TEST_FILES, options);
});

gulp.task('lint', ['lint:src', 'lint:tests']);

gulp.task('lint:watch', () => {
  gulp.watch([
    SRC_FILES,
    TEST_FILES,
  ], ['lint']);
});
