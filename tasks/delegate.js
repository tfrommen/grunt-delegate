/**
 * grunt-delegate
 * https://github.com/tfrommen/grunt-delegate
 *
 * Copyright (c) 2016 Thorsten Frommen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

	var description = 'Run a task (and an optional target) while using an arbitrary set of files to run checks against.';

	grunt.registerMultiTask( 'delegate', description, function() {
		grunt.task.run( this.data.task || this.target );
	} );

};
