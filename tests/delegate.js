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
		registerMultiTask: sinon.spy(),
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

	// Nested test, as it relies on the captured task function.
	assert.test( 'the delegate function runs all specified tasks', function( assert ) {
		// Reset the spy.
		grunt.task.run.reset();

		delegate.call( {
			data: {}
		} );

		assert.equal(
			grunt.task.run.callCount,
			1,
			'the delegate function SHOULD run one task.'
		);

		assert.equal(
			grunt.task.run.calledWith( undefined ),
			true,
			'the delegate function SHOULD run all specified tasks.'
		);

		assert.end();
	} );

	// Nested test, as it relies on the captured task function.
	assert.test( 'the delegate function runs the task named like the current target', function( assert ) {
		var target = 'someTask';

		// Reset the spy.
		grunt.task.run.reset();

		delegate.call( {
			data: {},
			target: target
		} );

		assert.equal(
			grunt.task.run.callCount,
			1,
			'the delegate function SHOULD run one task.'
		);

		assert.equal(
			grunt.task.run.calledWith( target ),
			true,
			'the delegate function SHOULD run the task named like the current target.'
		);

		assert.end();
	} );

	// Nested test, as it relies on the captured task function.
	assert.test( 'the delegate function runs the task specified in the current target', function( assert ) {
		var task = 'someTask:someTarget';

		// Reset the spy.
		grunt.task.run.reset();

		delegate.call( {
			data: {
				task: task
			}
		} );

		assert.equal(
			grunt.task.run.callCount,
			1,
			'the delegate function SHOULD run one task.'
		);

		assert.equal(
			grunt.task.run.calledWith( task ),
			true,
			'the delegate function SHOULD run the task specified in the current target.'
		);

		assert.end();
	} );

	assert.end();
} );
