const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

let pathDist = './dist';


// clean
gulp.task('clean', (cb) => {
    gulp.src(pathDist + '/*', { read: false }).pipe($.clean())
    cb();
});

// views
gulp.task('views', () => {
    gulp.src(['!./src/**/_*.pug', './src/**/*.pug'])
        .pipe($.pug({
            basedir: './node_modules/bembem'
        }))
        .pipe(gulp.dest(pathDist));
});


// styles
gulp.task('styles', () => {
    gulp.src('./src/**/*.scss')
        .pipe($.sass({
            includePaths: ['./src', './node_modules/bembem']
        }).on('error', $.sass.logError))
        .pipe(gulp.dest(pathDist));
});

// watches
gulp.task('watch', () => {
    gulp.watch('./src/**/*.scss', ['styles']);
    gulp.watch('./src/**/*.pug', ['views']);
});


// build
gulp.task('build', ['clean', 'views', 'styles']);

// development server
gulp.task('serve', ['build', 'watch'], () => browserSync
    .init({
        server: {
            baseDir: pathDist
        }
    })
);