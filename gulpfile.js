const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const liveServer = require('live-server');
const through2 = require('through2');

function checkForSpellingMistakes(text) {
    if (text.includes("data-csm-section")) {
        return false;
    }
    return true;
}

gulp.task('spellcheck', function () {
    return gulp.src('src/**/*.+(html|nunjucks|njk)')
        .pipe(through2.obj(function (file, _, cb) {
            if (file.isBuffer()) {
                const passed = checkForSpellingMistakes(file.contents.toString());
                if (!passed) {
                    console.log(`${file.path}: data-csm-section`);
                }
            }
            cb(null, file);
        }))
});

gulp.task('nunjucks', function () {
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/*.+(html|nunjucks|njk)')
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['src/layouts', 'src/templates', 'lib/html-snippets']
        }))
        // output files in app folder
        .pipe(gulp.dest('dist'))
});

gulp.task('copy', function () {
    gulp.src(['src/**/*.*', '!src/**/*.+(html|nunjucks|njk)'])
        .pipe(gulp.dest('dist'))
    gulp.src(['src/custom-js/**/*'])
        .pipe(gulp.dest('dist/custom-js'))
    gulp.src(['assets/**/*'])
        .pipe(gulp.dest('dist/assets'))
    return gulp.src(['src/custom-style/**/*'])
        .pipe(gulp.dest('dist/custom-style'))
});

gulp.task('liveserver', function () {
    liveServer.start({
        root: "dist",
        file: "index.html",
        logLevel: 0,
    });
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', gulp.series('nunjucks', 'copy'));
});
