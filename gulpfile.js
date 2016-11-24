
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

  var data = require('gulp-data');
  var stylus = require('gulp-stylus');

/*
* Configuración de la tarea 'demo'
*/
gulp.task('js', function () {
  gulp.src('public/js/source/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/js/build/'))
});


// Get one .styl file and render
gulp.task('stylus', function () {
  return gulp.src('public/css/stylus/main.styl')
    .pipe(stylus({
      compress:true
    }))
    .pipe(gulp.dest('public/css/build'));
});
