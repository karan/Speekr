var gulp = require('gulp');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

var watch = {
  styl: './private/stylus/**/*.styl'
};

var src = {
  styl: './private/stylus/index.styl'
};

var dest = {
  styl: './public/css'
};

// Stylus
gulp.task('stylus', function () {
  gulp.src(src.styl)
    .pipe(stylus({errors: true}))
    .pipe(prefix())
    .pipe(minifyCSS())
    .pipe(gulp.dest(dest.styl));
});

// Watch
gulp.task('watch', function () {
  gulp.watch(watch.styl, ['stylus']);
});

// Default
gulp.task('default', ['watch', 'stylus']);