'use strict'

var syncsplit = require('./')
var split = require('split')
var split2 = require('split2')
var bench = require('fastbench')
var fs = require('fs')

function benchEmpty (cb) {
  fs.createReadStream('package.json')
    .on('end', cb)
    .on('data', noop)
}

function benchSyncSplit (cb) {
  fs.createReadStream('package.json')
    .pipe(syncsplit())
    .on('end', cb)
    .on('data', noop)
}

function benchSplit (cb) {
  fs.createReadStream('package.json')
    .pipe(split())
    .on('end', cb)
    .resume()
}

function benchSplit2 (cb) {
  fs.createReadStream('package.json')
    .pipe(split2())
    .on('end', cb)
    .resume()
}

var run = bench([
  benchEmpty,
  benchSyncSplit,
  benchSplit,
  benchSplit2
], 10000)

run(run)

function noop () {}
