// unnecessary need to remove

// npm i gulp sass gulp-sass gulp-plumber gulp-postcss gulp-autoprefixer css-mqpacker gulp-clean-css gulp-uncss gulp-sourcemaps gulp-rename gulp-cssbeautify browser-sync gulp-imagemin gulp-svgstore gulp-svgmin del gulp-uglify pump

const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    plumber = require('gulp-plumber'),
    postcss = require("gulp-postcss"),
    autoprefixer = require('gulp-autoprefixer'),
    mqpacker = require('css-mqpacker'),
    minify = require('gulp-clean-css'),
    uncss = require('gulp-uncss'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    beautify = require('gulp-cssbeautify'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    pump = require('pump');


gulp.task('scss', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(beautify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    notify: false
  });
});

gulp.task('watch', gulp.parallel('browser-sync', 'scss', function() {
  gulp.watch('scss/**/*.scss').on('change', gulp.series('scss'));
  gulp.watch('./*.html').on('change', gulp.series(browserSync.reload));
  gulp.watch('./js/**/*.js').on('change', gulp.series(browserSync.reload));
}));

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp.src([
      'fonts/**',
      'img/**',
      'js/**/*.js',
      'css/**/*.css',
      '*.html'
    ], {
      base: "."
    })
    .pipe(gulp.dest('build'));
});

gulp.task('css', function() {
  return gulp.src('build/css/*.css')
    .pipe(postcss([
      mqpacker({
        sort: true
      })
    ]))
    .pipe(uncss({
            html: ['build/*.html']
    }))
    .pipe(autoprefixer({
      browsers: [
        'last 3 versions'
      ]
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'))
});

gulp.task('scripts', function(cb) {
  pump([
      gulp.src('build/js/**/*.js'),
      uglify(),
      rename({suffix: '.min'}),
      gulp.dest('build/js')
    ],
    cb
  );
});

gulp.task('images', function() {
  return gulp.src('build/img/**/*.{png,PNG,jpeg,jpg,JPG,gif,GIF}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      })
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('symbols', function() {
  return gulp.src('build/img/icons/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('build', gulp.series('scss', 'clean', 'copy', 'css', 'scripts', 'images', 'symbols'));
