'use strict'
/*** Gulp Basics***/
import gulp         from 'gulp';

/*** General ***/
import plumber      from 'gulp-plumber';
import del          from 'del';
import notify       from 'gulp-notify';
import sourcemaps   from 'gulp-sourcemaps';

/*** JavaScript ***/
import browserify   from 'browserify';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import source       from 'vinyl-source-stream';
import streamify    from 'gulp-streamify';

/*** CSS/SCSS ***/
import rename       from 'gulp-rename'
import compass      from 'gulp-compass';
import minifyCSS    from 'gulp-minify-css';
import prefixer     from 'gulp-autoprefixer';

/*** Server ***/
import livereload   from 'gulp-livereload';

const paths = {
    mainjs: 'src/js/main.js',
    alljs: 'src/js/*.js',
    basescss: 'src/scss/base.scss',
    allscss: 'src/scss/*.scss',
    html: 'public/index.html',
    distjs: 'public/assets',
    distcss: 'public/assets',
    tests: 'test/*_spec.js'
};


gulp.task('scripts', function() {
    browserify(paths.mainjs, {debug: true})
        .transform(babelify)
        .bundle()
        .on('error', function (err) { console.log('Error : ' + err.message); })
        .pipe(source('main.min.js'))
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")})) // prevents an error from stopping gulp
        .pipe(streamify(sourcemaps.init()))
        .pipe(streamify(uglify()))
        .pipe(streamify(sourcemaps.write('./')))
        .pipe(notify({message: "Generated file: <%= file.relative %>"}))
        .pipe(gulp.dest(paths.distjs))
        .pipe(livereload());
    });

gulp.task('css', function() {
    gulp.src(paths.basescss)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(compass({
            sass: 'src/scss',
            css: paths.assets
            }))
        .pipe(prefixer(['last 2 versions']))
        .pipe(gulp.dest(paths.distcss))
        .pipe(minifyCSS())
        .pipe(rename({
            basename: "style",
            suffix: ".min",
            extname: ".css"
            }))
        .pipe(sourcemaps.write('./'))
        .pipe(notify({message: "Generated file: <%= file.relative %>"}))
        .pipe(gulp.dest(paths.distcss))
        .pipe(livereload());
    });

gulp.task('delete', function() {
        del(['public/javascripts/*', 'public/stylesheets/*'], function(error) {
                console.log('Error on delete: ' + error);
            });
    });

gulp.task('default', ['delete', 'css', 'scripts'], function () {
    livereload.listen();
    gulp.watch(paths.alljs, ['scripts']);
    // gulp.watch(paths.tests, ['spec']);
    gulp.watch(paths.allscss, ['css']);
});
