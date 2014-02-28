/*
* grunt-contrib-namespaces
* https://github.com/jasonsavage/grunt-contrib-namespaces
*
* Copyright (c) 2014 jasonsavage
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) 
{
    grunt.registerTask('namespacer', 'recursively generates namespaces based on folder structure', function() 
    {
        // Merge options with defaults.
        var options = this.options({
          //not sure what goes here
        });
        
        grunt.verbose.writeflags(options, 'Options');
        
        this.files.forEach(function (f) 
        {
            var validFiles = removeInvalidFiles(f);
        
            if (options.join === true) 
            {
                writeFile(f.dest, concatInput(validFiles, options));
            } 
            else 
            {
                writeFile(f.dest, concatOutput(validFiles, options));
            }
        });
    });
};