const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');

    gulp.task('processHTML', () => {
      return gulp.src('*.html')
      .pipe(gulp.dest('dist'));
        });

    gulp.task('processJS', () => {
      return gulp.src('*.js')
        .pipe(gulp.dest('dist'));
      });
    
    gulp.task('processFunction', function () {
    return gulp.src(['functions.js',
          ], {
          }).pipe(gulp.dest('dist'));
});

     gulp.task('copy', function () {
     gulp.src('images/*.svg')
      .pipe(gulp.dest('dist/images/'));
});
   //  gulp.task('processSvg', () => {
     // return gulp.src(images, 'dist')
       // .pipe(gulp.dest('dist'));
     // });
     
    gulp.task('processJS', () => {
      return gulp.src('*.js')
      .pipe(jshint({
        esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist'));
    });

    gulp.task('processJS', () => {
      return gulp.src('*.js')
    .pipe(jshint({
      esversion: 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist'));
    });

    gulp.task('babelPolyfill', () => {
    return gulp.src('node_modules/@babel/polyfill/browser.js')
    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});



    gulp.task('watch', () => {
      gulp.watch('*.js', ['processJS']);
      gulp.watch('*.html', ['processHTML']);
    });

gulp.task('default', (callback) => {
  runSequence(['processHTML', 'processJS', 'processFunction', 'copy','babelPolyfill'], 'watch', callback);
});


gulp.task('browserSync', () => {
  browserSync.init({
    server: './dist',
    port: 8080,
    ui: {
      port: 8081
    }
  });
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('*.js', ['processJS']);
  gulp.watch('*.html', ['processHTML']);

  gulp.watch('dist/*.js', browserSync.reload);
  gulp.watch('dist/*.html', browserSync.reload);
});