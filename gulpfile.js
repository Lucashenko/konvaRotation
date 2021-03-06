var gulp = require('gulp');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var connect = require('gulp-connect');
var order = require('gulp-order');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require('gulp-clean-css');
var minJs = require('gulp-uglify');
var log = require('gulp-util').log;
var bowerFiles = require('main-bower-files');
var gulpfilter = require('gulp-filter');
var openUrl = require('gulp-open');
var sequence = require('gulp-sequence');
var modrewrite = require('connect-modrewrite');
var debug = require('gulp-debug'); // e.g .pipe(debug({title: 'unicorn:'}))
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var apidoc = require('gulp-api-doc');
var install = require('gulp-install');

var config = require('./gulp/config.js')();
var path = config.path;

require('./gulp/jslint.js')();

gulp.task('compile-pug', function() {
  return gulp.src(path.pug)
    .pipe( plumber() )
    .pipe( pug() )
    .on('error', log)
    .pipe( gulp.dest(path.dest) )
    .pipe( connect.reload() )
});

//  compile app.css file (default readable, --prod to minify)
gulp.task('app-css', function () {
  return gulp.src(path.css)
    .pipe( order(config.scssOrder) )
    .pipe(sourcemaps.init())
    .pipe( concat('app.css') )
    .pipe( plumber() )
    .pipe( sass() )
    .pipe( autoprefixer(config.autoprefixer) )
    .pipe( minCss() )
    .pipe(sourcemaps.write())
    .on('error', log )
    .pipe( gulp.dest(path.dest) )
    .pipe( connect.reload() );
});

//  compile app.js file (default readable, --prod to minify)
gulp.task('app-js', function () {
  return gulp.src(path.js)
    .pipe( plumber() )
    .pipe( order(config.jsOrder) )
    .pipe(sourcemaps.init())
    .pipe( concat('app.js') )
    // .pipe( minJs() )
    .pipe(sourcemaps.write())
    .on( 'error', log )
    .pipe( gulp.dest(path.dest) )
    .pipe( connect.reload() );
});

//  compile lib.js file from bower_components (default readable, --prod to minify)
gulp.task('lib-js', function () {
  var filter = gulpfilter(['**/**.js']);

  return gulp.src(bowerFiles())
    .pipe(filter)
    .pipe( plumber() )
    .pipe( concat('libs.js') )
    .on('error', log )
    .pipe( gulp.dest(path.dest) );
});

//  compile lib.css file from bower_components (default min)
gulp.task('lib-css', function () {
  var filter = gulpfilter(['**/**.css']);

  return gulp.src(bowerFiles())
    .pipe(filter)
    .pipe( plumber() )
    .pipe( concat('libs.css') )
    .on('error', log )
    .pipe( gulp.dest(path.dest) );
});

gulp.task('copy-lib-fonts' , function () {
  var filterFonts = gulpfilter(['**/**.otf', '**/**.eot', '**/**.svg', '**/**.ttf', '**/**.woff', '**/**.woff2']);

  gulp.src( bowerFiles() )
    .pipe(filterFonts)
    .pipe( gulp.dest(path.dest + '/fonts') )
});

//  copy font files, image files, etc.
gulp.task('assets', function () {
  return gulp.src(path.assets)
    .pipe( gulp.dest(path.dest + '/files') );
});

// Dev tasks

// start localhost.
gulp.task('server', function() {
  var port = 9000;

  return connect.server({
    root: path.dest,
    port: 9000,
    livereload: true,
    fallback: path.dest + '/index.html',
    middleware: function(connect, o) {
      return [
        modrewrite(
          [
            '^/api/(.*)$ https://localhost:' + port + '/api/$1 [P]',
          ]
        )
      ];
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(path.js, ['app-js']);
  gulp.watch(path.pug, ['compile-pug']);
  gulp.watch(path.css, ['app-css']);
  return gulp.watch(path.assets, ['assets']);
});

gulp.task('openUrl', function() {
  return gulp.src(__filename)
    .pipe( openUrl({uri: 'http://localhost:9000/'}) );
});

gulp.task('clean', function() {
  return gulp.src(path.dest, {read: false})
    .pipe(clean());
});

gulp.task('install', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(install({allowRoot: true}));
});

// --------------------------------------------------

var buildTasks = ['assets', 'compile-pug', 'app-js', 'lib-js', 'app-css', 'lib-css', 'copy-lib-fonts'];

// task for building app
gulp.task('build', function() {
  return sequence(['clean'], ['install'], buildTasks, function () {
      return log(' -| Builded');
    }
  );
});

gulp.task('dev', function() {
  return sequence(['clean'], buildTasks,['server'], ['watch'], 'openUrl', function() {
    return log(' -| Runned');
  });
});
