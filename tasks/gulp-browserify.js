import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'babelify';


function bundle (name) {
  let bundler = browserify({
    entries: `./src/js/${name}.js`,
    debug: true,
    transform: [[babel, { compact: false }]],
  });

  return bundler.bundle()
    .pipe(source(`${name}.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./extension/js/'));
}

const BROWSERIFY_NAMESPACES = [
  'options',
  'main',
];

let browserify_tasks = [];

for (let i = 0; i < BROWSERIFY_NAMESPACES.length; i++) {
  let name = BROWSERIFY_NAMESPACES[i];
  let taskName = `browserify:${name}`;

  gulp.task(taskName, () => {
    return bundle(name);
  });

  browserify_tasks.push(taskName);
}

gulp.task('browserify', browserify_tasks);

gulp.task('browserify:watch', () => {
  gulp.watch('./src/js/**/*.js', ['browserify']);
});

