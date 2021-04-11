const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

// ЗАПУСКАЕМ АВТООБНОВЛЕНИЕ, СТРАНИЦА ОБНОВЛЯЕТСЯ ПРИ 
// ИЗМЕНЕНИЯХ В ГОТОВЫХ ФАЙЛАХ В ПАПКЕ dist

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
});

// НАСТРАИВАЕМ СТИЛИ, КОМПИЛИРУЕМ SCSS И SASS В CSS И 
//МИНИФИЦИРУЕМ, И ТАКЖЕ ОТПРАВЛЯЕМ В dist

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});



gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});
gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('images', function() {
    return gulp.src("src/img/**/*")
        .pipe(gulp.dest("dist/img"));
});




gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'images', 'html'));