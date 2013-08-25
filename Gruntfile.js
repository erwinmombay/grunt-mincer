module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      test: ['tmp']
    },
    nodeunit: {
      writeAssetTrue: ['test/**/*.js', '!test/mincer_writeAssetFalse_test.js'],
      writeAssetFalse: ['test/mincer_writeAssetFalse_test.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    mince: {
      main: {
        include: ['test/fixtures', 'test/fixtures/lib'],
        destDir: 'tmp'
      },
      full: {
        include: ['test/fixtures', 'test/fixtures/lib'],
        src: 'main.js',
        dest: 'tmp/full.js'
      },
      writeAssetFalse: {
        include: ['test/fixtures', 'test/fixtures/lib'],
        src: 'main.js',
        dest: 'tmp/full.js',
        writeAsset: false
      }
    },
    jshint: {
      files: ['gruntfile.js', 'tasks/**/*.js', 'test/**/*_test.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        globals: {}
      },
    }
  });

  // Load mince task
  grunt.loadTasks('tasks');

  // Load contrib tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean',
    'mince:main',
    'mince:full',
    'nodeunit:writeAssetTrue'
  ]);
  grunt.registerTask('testWriteAssetFalse', [
    'clean',
    'mince:writeAssetFalse',
    'nodeunit:writeAssetFalse'
  ]);

  // Default task.
  grunt.registerTask('default', ['jshint', 'test', 'testWriteAssetFalse']);
};
