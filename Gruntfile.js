/* jshint strict: false */
/*global module: true, require: true */
module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  var STYLE_SRC_LOCATIONS = [
      'public/styles/reset.css',
      'public/styles/{,**/}*.less'
    ];
  var STYLE_SHEET_LOCATION = 'public/compiled_css/main.css';
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
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    copy: {
      dist:{
        files: [{
          expand: true,
          cwd: 'public',
          src: ['{,**/}*'],
          dest: 'dist/'
        }]
      }
    }
  });

  grunt.registerTask('default', ['less']);
  grunt.registerTask('dev', ['less', 'watch']);
  grunt.registerTask('dist', ['less', 'copy']);
};