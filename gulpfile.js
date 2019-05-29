'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// Compile SASS
gulp.task('sass', () => {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/*.scss'])
        .pipe(sass().on('error', onLessError))
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', () => {
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
    gulp.watch("app/*.html").on('change', browserSync.reload);

});
// Move JS Files to SRC
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js', 'node_modules/jquery-animated-headlines/dist/js/jquery.animatedheadline.min.js'])
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream());
});


// Move Font Awesome Fonts folder to src
gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("app/fonts"));
});

// animated headline css move
gulp.task('animated', function () {
    return gulp.src('node_modules/jquery-animated-headlines/dist/css/jquery.animatedheadline.css')
        .pipe(gulp.dest('app/css'))
})

// Move font awesome css file
gulp.task('fa', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("app/css"));
});
gulp.task('serve', function () {

    browserSync.init({
        files: [
            {
                match: ['app/scss/**/*.scss'],
                fn: function (event, file) {
                    this.reload()
                }
            }
        ],
        server: './app'
    });

    browserSync.watch('./app/**/*.*').on('change', browserSync.reload);
});

gulp.task('start', gulp.series('sass', gulp.parallel('watch', 'serve', 'sass', 'js', 'fonts', 'fa')));

/***HELPERS FUNCTIONS***/
function onLessError(error) {
    console.error(error.message);
    this.emit('end');
}