const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
// var spritesmith = require('gulp.spritesmith');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.*',
        dest: 'build/css/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/img/'
    },
    fonts: {
        src: 'src/fonts/*.*',
        dest: 'build/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/js/'
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths,
            // outputStyle: 'compressed'
          }))
        .pipe(sourcemaps.write())
        .pipe(stripCssComments())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
}


// очистка
function clean() {
    return del(paths.root);
}

// webpack
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// просто переносим картинки and fonts
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;




gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, scripts, fonts),
    gulp.parallel(watch, server)
));
