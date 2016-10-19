'use strict';

var fs = require('graceful-fs');
var map = require('map-stream');

module.exports = function (options) {
  return map(function (file, cb) {
    if (file.isNull()) { return cb(null, file); }

    // opens file
    fs.open(file.path, 'a', function (err, fd) {
      if (err) {
        cb(err, file);
        return;
      }

      if (file.stat.atime && file.stat.mtime) {
        // Update file modification and access time
        fs.futimes(fd, file.stat.atime, file.stat.mtime, function (err) {
          if (err) {
            cb(err, file);
            return;
          }

          fs.close(fd, function () {
            cb(null, file);
          });
        });
      } else {
        // File may be not null, but has change name (map, etc)
        cb(null, file);
      }
    });
  });
}
