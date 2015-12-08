var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('default', [
    'js-dependencies',
    'css',
    'fonts'
], function() {
});

gulp.task('js-dependencies', function() {
    return gulp.src([
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/ui-select/dist/select.min.js',
        'resources/assets/js/app.js',
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('css', function() {
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
        'bower_components/ui-select/dist/select.min.css',
    ])
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('fonts', function() {
    return gulp.src([
        'bower_components/bootstrap/dist/fonts/*'
    ])
    .pipe(gulp.dest('public/assets/fonts'));
});
