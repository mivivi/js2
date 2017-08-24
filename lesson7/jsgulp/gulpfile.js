var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

    var path = {
        build: {
            html: 'build/',
            js: 'build/js/',
            css:'build/css/'
        },
        src: {
            html: 'app/*.html',
            js: 'app/js/main.js',
            style: 'app/style/main.scss'
        },

        watch: {
            html: 'app/**/*.html',
            js: 'app/js/**/*.js',
            style: 'app/style/**/*.scss'
        },
        clean: './build'
    };

    var config = {
        server: {
            baseDir: './build'
        }
    }


    gulp.task('html:build', function (){
        gulp.src('path.app.html')
        .pipe(rigger())
        .pipe(gulp.dest('path.build.html'))
        .pipe(reload({stream: true}));
        });

    gulp.task('js:build', function () {
    gulp.src('path.app.js') 
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest('path.build.js')) 
        .pipe(reload({stream: true}));
});

