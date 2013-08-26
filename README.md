[![Build Status](https://secure.travis-ci.org/pirxpilot/grunt-mincer.png)](http://travis-ci.org/pirxpilot/grunt-mincer)
[![Dependency Status](https://gemnasium.com/pirxpilot/grunt-mincer.png)](https://gemnasium.com/pirxpilot/grunt-mincer)
[![NPM version](https://badge.fury.io/js/grunt-mincer.png)](http://badge.fury.io/js/grunt-mincer)

# grunt-mincer

Use [mincer] to concatenate your sources.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-mincer`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-mincer');
```

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md
[mincer]: https://github.com/nodeca/mincer
[grunt_multi_task]: https://github.com/gruntjs/grunt/blob/master/docs/types_of_tasks.md

## Documentation

Mincer is a [multi task][grunt_multi_task], meaning that grunt will automatically iterate over all
`mince` targets if a target is not specified.

### Overview

Inside your `grunt.js` file, add a section named `mince`.

### Parameters

#### src ```string```

Name of the file to be processed by mincer. It probably contains one or more mincer `require`
directives. If source is not specified your target name with `.js` suffix will be used.

#### dest ```string```

Output file: this is where mincer is going to dump your concatenated sources.

#### destDir ```string```

If `dest` is not specified `destDir` and the name of your target are used to determine the name of
the output file: ```path.join(destDir, target + '.js')```

#### include ```string|array```

List of directories that are added to [mincer] load path. If you have only one directory it can be
specified as a single string.

#### configure ```function(mincer)```

Optional configure function that is called before before `compile` phase: allows for configuring
options for various mincer engines.

### Config Examples

There are couple of formats you can use to configure mincer task.

```javascript
'mince': {
  'main': {
    include: ['src', 'module/src'],
    src: 'main.js',
    dest: 'build/main.js'
  }
}
```

You can skip `src` if it has the same basename as your target:

```javascript
'mince': {
  'main': {
    include: ['src', 'module/src'],
    dest: 'build/main.js'
  }
}
```

You can specify `destDir` instead of `dest` if your output file has the same basename as your target:

```javascript
'mince': {
  'main': {
    include: ['src', 'module/src'],
    destDir: 'build'
  }
}
```

And if you only have one `include` directory you can specify it as string:

```javascript
'mince': {
  'main': {
    include: 'src',
    destDir: 'build'
  }
}
```

You can use different format for each target.

To configure `StylusEngine` to use `nib`:

```javascript
'mince': {
  'main': {
    include: 'src',
    destDir: 'build',
    configure: function(mincer) {
      var nib = require('nib');
      mincer.StylusEngine.registerConfigurator(function(stylus) {
        stylus.use(nib());
      })
    }
  }
}
```

#### writeAsset ```boolean```

Default: true

Flag which dictates whether to write the compiled asset file or not (this is in case you don't want the default write behavior and would like to override it through `onCompile`).

#### onCompile ```function(asset)```

Called during the asset compile stage just after the default write behavior (if not `writeAsset` is not set to false). The Mincer asset instance is passed in as the first argument.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for
any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History

- grunt-mincer 0.2 is compatible with grunt 0.3
- grunt-mincer 0.3 and newer is compatible with grunt 0.4


See [History.md](History.md)

## License
Copyright (c) 2012 (pirxpilot) Damian Krzeminski
Licensed under the MIT license.
