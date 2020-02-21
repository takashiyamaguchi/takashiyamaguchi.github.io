'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
const ejsLint = require('ejs-lint');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create()

sass.compiler = require('node-sass');

// path
const srcPath = {
    html: [
        'ejs/**/*.ejs',
        '!' + 'ejs/**/_*.ejs'
    ],
    css: [
        'scss/**/*.scss'
    ]
}

const distPath = {
    root: './',
    html: 'ejs/**/*.ejs',
    css: 'scss/**/*.scss'
}

// error option
const plumberErrorMessage = {
    errorHandler: notify.onError('<%= error.message %>')
}

// sass option
const postcssOption = [
    autoprefixer({
        grid: true
    }), mqpacker
]

// 

const serve = (done) => {
    const browserSyncOption = {
        port: 3000,
        server: {
            baseDir: distPath.root
        }
    }
    browserSync.init(browserSyncOption);
    done();
    console.log('Server was launched');
}

// sass compile
const css = () => {
    return src(srcPath.css)
        .pipe(
            plumber(plumberErrorMessage)
        )
        .pipe(sass())
        .pipe(postcss(postcssOption))
        .pipe(dest('./css'));
}

// ejs compile
const html = () => {
    return src(srcPath.html)
        .pipe(
            plumber(plumberErrorMessage)
        )
        .pipe(ejs({}, {}, { ext: '.html' }))
        .pipe(rename({ extname: '.html' }))
        .pipe(dest('./'));
}

const watchAll = (done) => {
    const browserReload = () => {
        browserSync.reload()
    }
    watch(distPath.html, html);
    watch(distPath.css, css);
    watch([distPath.html, distPath.css], browserReload);
    done()
}

// exports.default = () => {
//     parallel(html, css, serve, watchAll);
// }

exports.default = series(
    parallel(html, css, serve),
    watchAll
);


