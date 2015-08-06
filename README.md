# gulp-preservetime

Preserves the file modification and accessed time of a file copied using gulp

## Install

TBC

## Example

```js
var gulp = require('gulp');
var preservetime = require('gulp-preservetime');

gulp.task('default', function() {
	gulp.src('./src/**/*')
		.pipe(gulp.dest('./dest'))
		.pipe(preservetime());
});
```