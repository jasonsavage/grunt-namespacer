
/**
 * Grunt task runner file used to build project. 
 */

module.exports = function(grunt) 
{
    "use strict";
    //var files = ['Gruntfile.js', 'tasks/**/*.js'];
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        //watch: {
        //  files: files,
        //  tasks: 'default'
        //},
        
        namespacer : {
            test : {
                src     : 'test/src/app/',
                dest    : 'test/build/'
            }
        }
    });

  // Load the plugins that provide each task.
  //grunt.loadNpmTasks("grunt-contrib-jshint");
  //grunt.loadNpmTasks("grunt-contrib-watch");
  
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', ['namespacer']);

};