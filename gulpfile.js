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

gulp.task('localWebsiteServer', function () {

});



gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});