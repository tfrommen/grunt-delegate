'use strict';

module.exports = function( grunt ) {

	/**
	 * @see {@link https://github.com/sindresorhus/load-grunt-tasks load-grunt-tasks}
	 */
	require( 'load-grunt-tasks' )( grunt );

	grunt.initConfig( {
		/**
		 * @see {@link https://github.com/gruntjs/grunt-contrib-jshint grunt-contrib-jshint}
		 * @see {@link https://github.com/jshint/jshint JSHint}
		 */
		jshint: {
			options: {
				jshintrc: true,
				/**
				 * @see {@link https://github.com/sindresorhus/jshint-stylish jshint-stylish}
				 */
				reporter: require( 'jshint-stylish' )
			},

			root: {
				src: [ '.js' ]
			},

			tasks: {
				src: [ 'tasks/*.js' ]
			},

			tests: {
				src: [ 'tests/*.js' ]
			}
		},

		/**
		 * @see {@link https://github.com/brandonramirez/grunt-jsonlint grunt-jsonlint}
		 * @see {@link https://github.com/zaach/jsonlint JSON Lint}
		 */
		jsonlint: {
			options: {
				format: true,
				indent: 2
			},

			configs: {
				src: [ '.*rc' ]
			},

			json: {
				src: [ '*.json' ]
			}
		},

		/**
		 * @see {@link https://github.com/ariya/grunt-jsvalidate grunt-jsvalidate}
		 * @see {@link https://github.com/jquery/esprima Esprima}
		 */
		jsvalidate: {
			options: {
				verbose: false
			},

			root: {
				src: [ '*.js' ]
			},

			tasks: {
				src: [ 'tasks/*.js' ]
			},

			tests: {
				src: [ 'tests/*.js' ]
			}
		},

		/**
		 * @see {@link https://github.com/suisho/grunt-lineending grunt-lineending}
		 */
		lineending: {
			options: {
				eol: 'lf',
				overwrite: true
			},

			root: {
				'': [ '*' ]
			},

			tasks: {
				'': [ 'tasks/*' ]
			},

			tests: {
				'': [ 'tests/*' ]
			}
		},

		/**
		 * @see {@link https://github.com/sindresorhus/grunt-shell grunt-shell}
		 */
		shell: {
			/**
			 * @see {@link https://github.com/substack/tape tape}
			 * @see {@link https://github.com/substack/faucet faucet}
			 */
			tape: {
				command: '"./node_modules/.bin/tape" tests/delegate.js | "./node_modules/.bin/faucet"'
			}
		}
	} );

	grunt.registerTask( 'test', [
		'jshint',
		'jsonlint',
		'jsvalidate',
		'shell:tape'
	] );

	grunt.registerTask( 'pre-commit', [
		'test',
		'lineending'
	] );

	grunt.registerTask( 'default', 'test' );

};
