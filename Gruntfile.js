/* jshint strict: false */
/*global module: true, require: true */
module.exports = function(grunt) {
	require('jit-grunt')(grunt);
	var path = require('path');
	var STYLE_SRC_LOCATIONS = [
		'public/styles/reset.css',
		'public/styles/{,**/}*.less'
	];
	var STYLE_SHEET_LOCATION = 'public/compiled_css/main.css';
	var SERVING_ROOT = 'public';
	grunt.initConfig({
		less: {
			development: {
				options: {
				  // compress: true,
				  // sourceMap: true
				},
				files: [{
					src: STYLE_SRC_LOCATIONS,
					dest: STYLE_SHEET_LOCATION,
				}]
			}
		},
		watch: {
			styles: {
				files: STYLE_SRC_LOCATIONS,
				tasks: ['clean', 'less'],
				options: {
					nospawn: true
				}
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: SERVING_ROOT,
					src: ['{,**/}*'],
					dest: 'dist/'
				}]
			}
		},
		clean: {
			all: ['public/compiled_css/', 'dist/']
		}
	});

	grunt.registerTask('default', ['clean', 'less']);
	grunt.registerTask('dev', ['clean', 'less', 'watch']);
	grunt.registerTask('dist', ['clean', 'less', 'copy']);
};