/*
 * grunt-mincer
 * https://github.com/pirxpilot/grunt-mincer
 *
 * Copyright (c) 2012 Damian Krzeminski
 * Licensed under the MIT license.
 */


var path = require('path');

module.exports = function(grunt) {
  'use strict';

  var mince = require('./lib/mince').init(grunt).mince;
  var _ = grunt.util._;

  grunt.registerMultiTask('mince', 'Use mincer to concatenate your files.', function () {
    function toArray(strOrArray) {
      return Array.isArray(strOrArray) ? strOrArray : [strOrArray];
    }

    var options = this.data,
      include = toArray(options.include),
      src = options.src || this.target + '.js',
      dest = options.dest || path.join(options.destDir, this.target + '.js'),
      // default `writeAsset` to true since that is the original behaviour of grunt-mincer
      writeAsset = (options.writeAsset === void 0) || options.writeAsset,
      onCompile = options.onCompile || null,
      done = this.async();

    mince(src, dest, include, options.configure, writeAsset, function(err, asset) {
      if (err) {
        grunt.warn(err);
      } else {
        if (grunt.util.kindOf(onCompile) === 'function') {
          onCompile(_.merge({ asset: asset }, options));
        }
        grunt.log.ok();
      }
      done();
    });
  });
};
