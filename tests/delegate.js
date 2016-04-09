'use strict';

var test = require( 'tape' );
var sinon = require( 'sinon' );

var theModule = require( '../tasks/delegate' );

test( 'the module is a function', function( assert ) {
	assert.equal(
		typeof theModule,
		'function',
		'the module SHOULD be a function.'
	);

	assert.end();
} );

test( 'the module registers the expected multi task', function( assert ) {
	var grunt = {
		registerMultiTask: sinon.spy( function( taskName, description, taskFunction ) {
			// TODO: Do something with "taskFunction"...?!
		} ),
		task: {
			run: sinon.spy()
		}
	};

	theModule( grunt );

	assert.equal(
		grunt.registerMultiTask.callCount,
		1,
		'the module SHOULD register one multi task.'
	);

	assert.equal(
		grunt.registerMultiTask.calledWith( 'delegate', sinon.match.string, sinon.match.func ),
		true,
		'the module SHOULD register the delegate multi task with the expected arguments.'
	);

	// Capture the task function for direct testing.
	var delegate = grunt.registerMultiTask.firstCall.args[ 2 ];

	// TODO: Test the captured function - which doesn't seem to work as expected...?!
	// delegate();

	// assert.equal(
	// 	grunt.task.run.callCount,
	// 	1,
	// 	'running the task function SHOULD (try to) run one task.'
	// );

	assert.end();
} );
