const gulp = require('gulp');

var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

function style() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dir'))
    .pipe(browserSync.stream())
}
function script() {
    return gulp.src('./src/js/*.js')
      .pipe(concat('code.js'))
      .pipe(gulp.dest('./src/dir'))
      .pipe(browserSync.stream())
  }
function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./src/scss/*.scss', style);
  gulp.watch('./src/js/*.js', script);
}

exports.style = style;
exports.script = script;
exports.watch = watch;
