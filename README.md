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

## Changelog

### 1.2.1
* Fix Pipe Interruption (thanks gzzz)
### 1.1.0
* Support microsecond precision on file times using futimes instead of utimes (thanks ibobo)