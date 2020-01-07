'use strict';

const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
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

// sass compile
const css = () => {
    return src(srcPath.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css'));
}

// ejs compile
const html = () => {
    return src(srcPath.html)
        .pipe(ejs({}, {}, {ext:'.html'}))
        .pipe(rename({ extname: '.html' }))
        .pipe(dest('./'));
}

exports.default = () => {
    watch(distPath.html, html)
    watch(distPath.css, css)
}

exports.build = parallel(html, css)