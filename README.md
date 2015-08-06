# gulp-preservetime

Preserves the file modification and accessed time of a file copied using gulp

## Install

Install with [npm](https://npmjs.org/package/gulp-preservetime)

```
npm install --save-dev gulp-preservetime
```

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