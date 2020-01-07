'use strict';

const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
const ejsLint = require('ejs-lint');
const replace = require('gulp-replace');

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
    html: 'ejs/**/*.ejs',
    css: 'scss/**/*.scss'
}

// error option
const plumberErrorMessage = {
    errorHandler: notify.onError('<%= error.message %>')
}

// sass compile
const css = () => {
    return src(srcPath.css)
        .pipe(
            plumber(plumberErrorMessage)
        )
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css'));
}

// ejs compile
const html = () => {
    return src(srcPath.html)
        .pipe(
            plumber(plumberErrorMessage)
        )
        .pipe(ejs({}, {}, {ext:'.html'}))
        .pipe(rename({ extname: '.html' }))
        .pipe(dest('./'));
}

exports.default = () => {
    watch(distPath.html, html)
    watch(distPath.css, css)
}

exports.build = parallel(html, css)