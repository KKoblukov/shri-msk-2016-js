const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssImport = require('postcss-import');
const cssNano = require('cssnano');
const cssNext = require('postcss-cssnext');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const inlineSVG = require('postcss-inline-svg');
const postcss = require('gulp-postcss');
const size = require('postcss-size');
const sourcemaps = require('gulp-sourcemaps');
const svgo = require('postcss-svgo');
const uglify = require('gulp-uglify');
const uncss = require('postcss-uncss');

gulp.task('default', ['server'], () => {
    gulp.watch('src/index.html', (event) => {
        gulp.run('html');
    });
    gulp.watch('src/css/**', (event) => {
        gulp.run('css');
    });
    gulp.watch('src/js/**', (event) => {
        gulp.run('js');
    });
});

gulp.task('build', () => {
    gulp.run('html', 'css', 'js', 'images');
});

// HTML

gulp.task('html', () => {
    gulp.src('src/index.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
    }))
    .pipe(gulp.dest('./dist/'))
.pipe(browserSync.stream());
});

// PostCSS

gulp.task('css', () => {
    const processors = [
        cssImport({
            plugins: [
                uncss({
                    html: ['./src/index.html']
                })
            ]
        }),
        size,
        inlineSVG,
        svgo,
        cssNext({
            autoprefixer: ['ie >= 10', '> 2% in RU']
        }),
        cssNano({
            autoprefixer: false
        })
    ];
    return gulp.src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

// JavaScript


gulp.task('js', () => {
    gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Images

gulp.task('images', () => {
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// Server

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: './dist/'
        },
        open: true
    });
});
