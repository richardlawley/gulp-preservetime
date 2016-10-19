'use strict'

var should = require('should');
var fs = require('fs-extra');
var preservetime = require('./index');
var gulp = require('gulp');
var es = require('event-stream');

var atime = new Date(2000, 1, 2, 3, 4, 5),
    mtime = new Date(2010, 10, 12, 13, 14, 15),
    srcdir = './test-src',
    dest = './test-dest';
var subdir = srcdir + '/subdir';
var firstTestFile = '/a',
    secondTestFile = '/subdir/b';

beforeEach(function () {
    clearUp();
    fs.mkdirsSync(subdir, parseInt('777', 8));
    fs.writeFileSync(srcdir + firstTestFile, 'Test Data', {
        mode: parseInt('777', 8)
    });
    fs.utimesSync(srcdir + firstTestFile, atime, mtime);
    fs.writeFileSync(srcdir + secondTestFile, 'Test Data', {
        mode: parseInt('777', 8)
    });
    fs.utimesSync(srcdir + secondTestFile, atime, mtime);
})

after(function () {
    clearUp();
})

it('should preserve file mtime', function (cb) {

    gulp.src(srcdir + '/**/*')
        .pipe(gulp.dest(dest))
        .pipe(preservetime())
        .pipe(es.wait(function (err, data) {

            // Read file modification times in dest
            var firstFileStats = fs.statSync(dest + firstTestFile),
                secondFileStats = fs.statSync(dest + secondTestFile);

            firstFileStats.mtime.getTime().should.equal(mtime.getTime());
            secondFileStats.mtime.getTime().should.equal(mtime.getTime());

            cb();
        }));
});

it('should preserve file atime', function (cb) {

    gulp.src(srcdir + '/**/*')
        .pipe(gulp.dest(dest))
        .pipe(preservetime())
        .pipe(es.wait(function (err, data) {

            // Read file modification times in dest
            var firstFileStats = fs.statSync(dest + firstTestFile),
                secondFileStats = fs.statSync(dest + secondTestFile);

            firstFileStats.atime.getTime().should.equal(atime.getTime());
            secondFileStats.atime.getTime().should.equal(atime.getTime());

            cb();
        }));
});

it('should not alter file', function (cb) {

    gulp.src(srcdir + '/**/*')
        .pipe(gulp.dest(dest))
        .pipe(preservetime())
        .pipe(es.wait(function (err, data) {

            // Read file modification times in dest
            var firstFileContent = fs.readFileSync(dest + firstTestFile, {
                encoding: 'utf8'
            }),
                secondFileContent = fs.readFileSync(dest + secondTestFile, {
                    encoding: 'utf8'
                });

            firstFileContent.should.equal('Test Data');
            secondFileContent.should.equal('Test Data');

            cb();
        }));
});


function clearUp() {
    if (fs.existsSync(srcdir)) {
        fs.removeSync(srcdir);
    }
    clearOutput();
}

function clearOutput() {
    if (fs.existsSync(dest)) {
        fs.removeSync(dest);
    }
}
