var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var webserver = require('gulp-webserver');

gulp.task('nunjucks', function () {
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/pages/**/*.+(html|nunjucks|njk)')
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['src/layouts']
        }))
        // output files in app folder
        .pipe(gulp.dest('dist'))
});

gulp.task('copy', function () {
    return gulp.src(['src/pages/**/*.*', '!src/pages/**/*.+(html|nunjucks|njk)'])
        .pipe(gulp.dest('dist'))
});

gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            port: 9001,
            livereload: true,
            open: true
        }));
});

gulp.task('docs', function () {
    gulp.src('docs')
        .pipe(webserver({
            port: 9002,
            livereload: true,
            open: true
        }));
});