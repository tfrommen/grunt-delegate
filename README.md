# grunt-delegate [![Build Status](https://travis-ci.org/tfrommen/grunt-delegate.svg?branch=master)](http://travis-ci.org/tfrommen/grunt-delegate)

> Run a task (and an optional target) while using an arbitrary set of files to run checks against.

## Getting Started

If you haven't used [Grunt](http://gruntjs.com) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm i -D grunt-delegate
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks( 'grunt-delegate' );
```

## Usage

_Run this task with the `$ grunt delegate` command._

Task targets and files may be specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

The primary goal of this task is to specify a set of files (e.g., by defining a `src` property) that you can use in the context of another task.
This can be achieved by not running the `delegate` task directly, but indirectly via another task.
Not yet perfectly clear? Let's see some real world examples then...

### Examples

#### Convert `.scss` files if any of them changed since the last run

In this example, running `$ grunt changed:delegate:sass` (or `$ grunt changed:delegate` because `delegate` is a [multi task][multitask]) will run the `sass` task if any `.scss` file changed since the last run.
You cannot just run `$ grunt changed:sass`, because the files specified in the `sass` task are the _root_ files only.
Thus, `grunt-changed` is unaware of changed partials or modules.
By having `grunt-changed` check the files provided by the `delegate` configuration, however, **any** changed `.scss` file (compare `resources/scss/**/*.scss` with `resources/scss/*.scss`) will cause the `sass` task to get run.

```js
grunt.initConfig( {
	delegate: {
		sass: {
			src: [ 'resources/scss/**/*.scss' ]
		}
	},

	sass: {
		all: {
			expand: true,
			cwd: 'resources/scss/',
			src: [ '*.scss' ],
			dest: 'assets/css/',
			ext: '.css'
		}
	}
} );
```

#### Transpile ES6 `.js` files if any of them is newer than the time of the last run

In this example, running `$ grunt newer:delegate:transpile` will run the `browserify` task with the `admin` target (see the `task` property of the according `delegate` configuration) if any `.js` file is newer than the time of the last run.
You cannot just run `$ grunt newer:browserify:admin`, because the file specified in the `browserify` task is the _main_ file only.
Thus, `grunt-newer` is unaware of newer modules or helper files.
By having `grunt-newer` check the files provided by the `delegate` configuration, however, **any** newer `.js` file (compare `resources/js/**/*.js` with `resources/js/admin.js`) will cause the `browserify` task with the `admin` target to get run.

```js
grunt.initConfig( {
	browserify: {
		admin: {
			options: {
				transform: [
					[ 'babelify' ]
				]
			},
			src: [ 'resources/js/admin.js' ],
			dest: 'assets/js/admin.js'
		},

		vendor: {
			options: {
				require: [ 'jquery' ]
			},
			src: [],
			dest: 'public/vendor.js'
		},
	},

	delegate: {
		transpile: {
			src: [ 'resources/js/**/*.js' ],
			task: 'browserify:admin'
		}
	}
} );
```

#### Test `.php` source files if any of them **or** one of the tests is newer than the time of the last run

In this example, running `$ grunt newer:delegate:phpunit` will run the `shell` task with the `phpunit` target (see the `task` property of the according `delegate` configuration) if any `.php` source files or tests is newer than the time of the last run.
You cannot just run `$ grunt newer:shell:phpunit`, because in the `shell` task are no files specified.
By having `grunt-newer` check the files provided by the `delegate` configuration, however, **any** newer `.php` source file or test will cause the `shell` task with the `phpunit` target to get run.

```js
grunt.initConfig( {
	delegate: {
		phpunit: {
			src: [ 'src/**/*.php', 'tests/**/*.php' ],
			task: 'shell:phpunit'
		}
	},

	shell: {
		phpunit: {
			command: 'phpunit'
		}
	},
} );
```

## Changelog

See [CHANGELOG.md][CHANGELOG.md).

---

Task submitted by [Thorsten Frommen](https://github.com/tfrommen).
