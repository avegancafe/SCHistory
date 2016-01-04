var gulp = require("gulp");
var react = require("gulp-react");
var sass = require("gulp-sass");

gulp.task("react", function () {
  return gulp.src(["app/assets/jsx/**/*.jsx"])
    .pipe(react())
    .pipe(gulp.dest("app/assets/javascripts"));
});

gulp.task("sass", function () {
  return gulp.src(["app/assets/sass/**/*.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("app/assets/stylesheets"));
});

gulp.task("default", ["react", "sass"]);
