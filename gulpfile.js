var gulp = require('gulp'),    
    uglify = require('gulp-uglifyjs'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css');
    sourcemaps = require('gulp-sourcemaps');
    rename = require('gulp-rename');
    var loopbackAngular = require('gulp-loopback-sdk-angular');
	
	
gulp.task('html', function(){
  gulp.src(['client/*.html', 'client/components/**/*.html'])
   
});

gulp.task('miniJS', function() {
  return gulp.src(['client/*.js', 'client/directives/*.js', 'client/services/*.js', 'client/components/**/*.js'])
    .pipe(uglify({mangle: false}))   
    .pipe(concat('client.min.js'))    
    .pipe(gulp.dest('./client'));

});

gulp.task('browsersync', function(cb) {
    return browsersync({
        server: {
            baseDir:'./client'
        }
    }, cb);
});

var filesJS = [
        './bower_components/angular/angular.min.js',
        './bower_components/angular-aria/angular-aria.min.js',
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angular-material/angular-material.min.js',
        './bower_components/ui-router/release/angular-ui-router.min.js',
        './bower_components/angular-resource/angular-resource.min.js'
    ];
	
var filesCSS = [
    './bower_components/angular-material/angular-material.min.css'
]     
    
gulp.task('moveJS', function(){
  gulp.src(filesJS)  
  .pipe(concat('resources.js'))
  .pipe(gulp.dest('client/dist/js'));  
});

gulp.task('moveCSS',['moveJS'], function(){
  gulp.src(filesCSS)
  .pipe(gulp.dest('client/dist/css'));
});

gulp.task('LB', function () {
    return gulp.src('server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('client/dist/js'));
});

gulp.task('watch', function () {
  gulp.watch('client/**/*.html', ['html', browsersync.reload]); 
  gulp.watch('client/components/**/*.js', ['html', browsersync.reload]); 
  gulp.watch('client/components/**/*.html', ['html', browsersync.reload]);   
  gulp.watch('*.html', ['html', browsersync.reload]); 
  gulp.watch('client/*.js', ['html', browsersync.reload]);
 


});
 
gulp.task('default', ['browsersync', 'watch', 'moveJS', 'moveCSS', 'LB']);

