var gulp = require("gulp");
var react = require("gulp-react");

gulp.task("react", function () {
  return gulp.src(["app/assets/jsx/**/*.jsx"])
    .pipe(react())
    .pipe(gulp.dest("app/assets/javascripts"));
});

gulp.task("default", ["react"]);
