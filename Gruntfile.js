
/**
 * Grunt task runner file used to build project. 
 */

module.exports = function(grunt) 
{
    "use strict";
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        
        namespacer : {
            
            test : {
                name    : "app",
                src     : 'test/src/app',
                dest    : 'test/build/core.js'
            }
        },
        
        //jshint
        jshint: {
            all: ['test/build/app.js']
        },
        
        mocha_phantomjs: {
            all: ['test/index.html']
        }

    });

  // Load the plugins that provide each task.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', ['namespacer', 'jshint', 'mocha_phantomjs']);
  grunt.registerTask('dev', ['namespacer']);

};