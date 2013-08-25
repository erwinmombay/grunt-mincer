var grunt = require('grunt');

exports['mince'] = {
  'mince': function(test) {
    test.expect(1);

    var expected = grunt.file.read('test/expected/main.js');

    var exists = grunt.file.exists('tmp/full.js');
    test.equal(false, exists, 'tmp/full.js should not exists when assetWrite is false');

    test.done();
  }
};
