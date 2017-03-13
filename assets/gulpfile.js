var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default',['sass-site', 'sass-admin', 'watch']);

gulp.task('sass-site', function () {
    return gulp.src('css/site/style.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('css/site'));
});

gulp.task('sass-admin', function () {
    return gulp.src('css/admin/style.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('css/admin'));
});

gulp.task('watch',function(){
    gulp.watch('css/site/*.scss',['sass-site']);
    gulp.watch('css/admin/*.scss',['sass-admin']);
});