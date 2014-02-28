/*
* grunt-namespacer
* https://github.com/jasonsavage/grunt-namespacer
*
* Copyright (c) 2014 jasonsavage
* Licensed under the MIT license.
* 
* help taken from grunt-wrap by Christopher Rogers and grunt-autowrap by Vontio
*/

'use strict';

module.exports = function(grunt) 
{
    'use strict';

    
    //register task
    grunt.registerMultiTask('namespacer', 'recursively generates namespaces based on folder structure', function() 
    {
        // Merge options with defaults.
        var options = this.options({
          //not sure what goes here
        });
        
        grunt.verbose.writeflags(options, 'Options');
        
        this.files.forEach(function (target) 
        {
            //task listed in the config for this task
            
            //target.src
            //target.dest
            
            //remove trailing /'s from src and dest
            var src     = target.src.toString().replace(/(\/$)/,''),
                dest    = target.dest.toString().replace(/(\/$)/,''),
            
            //get the starting namespace based on dir name
                base = src.substring(src.lastIndexOf('/')+1),
            
            //tracks all namespaces created
                namespaces = [];
            
            var directories = grunt.file.expand(src + "/**/");
            
            directories.forEach(function(path)
            {
                var ns = path.substring(path.indexOf(base), path.lastIndexOf('/')).replace(/\//g, '.'),
                    content = concatFilesInDir(path, "\n");
                
                //collect namespace
                namespaces.push(ns);
                
                //proccess content
                content = addNamespaceExports(content);
                content = addWrapper(ns, content);
                
                //generate tmp path
                var path = dest + '/tmp/' + ns + '.js';
                
                //flush the contents to {tmp} destination
                grunt.file.write(path, content);
            });
            
            //write namespaces file
            grunt.file.write(dest + '/tmp/00_ns.js', getNamespaceJS(namespaces) );
            
            //concat all files together into {base}.js
            var content = concatFilesInDir(dest + '/tmp/', "\n\n");
            
            //add wrapper
            content = '(function() {\n' + content + '\n}());';
            
            //save
            grunt.file.write(dest + '/' + base + '.js', content );
            
            //remove tmp folder
            
            //end
        });
    });
    
    function addWrapper(namespace, content)
    {
        //clean up extra "use_strict" statements
        content = content.replace(/["']?use_strict["']?;?/g, '');
        
        //add wrapper for namespace
        return '(function(ns) {\n' + content + '\n}(' + namespace + '));';
    }
    
    /**
     * Takes each function definition and add a matching export for variable "ns" 
     * expect match function test() and var test = function()
     * expect method to ignore functions starting with '_'
     */
    function addNamespaceExports(content)
    {
        var matches = content.match(/function\s+[^_]\w+\(|var\s+[^_]\w+\s+=\s+function\(/g),
            exports = matches.map(function(str)
            {
                return str.replace(/function\s+(\w+)\(/, 'ns.$1 = $1;')
                          .replace(/var\s+(\w+)\s+=\s+function\(/, 'ns.$1 = $1;');
            });
        
        return content + '\n\n' + exports.join('\n');
    }
    
    function concatFilesInDir(dir, separator)
    {
        var files = grunt.file.expand(dir + "/*.js");
        return files.map(function (filePath) {
            return grunt.file.read(filePath);
        }).join(grunt.util.normalizelf(separator));
    }
    
    function getNamespaceJS(namespaces)
    {
        return namespaces.map(function (ns) {
            return 'window.' + ns + ' = {};';
        }).join('\n');
    }
    
    function flush_namespace_to_tmp(dest, ns, content)
    {
        //check if file exists for this subdir
        var path = dest + '/tmp/' + ns + '.js';
        
        //TODO: get all functions and append to namespace
        // function test() {}  adds app.test = test; to end
        var methods = content.match(/function\s+(\w+)\(/g);
        console.log(methods);
        
        //add wrapper
        content = '(function(ns) {\n' + content + '\n}(' + ns + '));';
        
        //flush the contents to {tmp} destination
        grunt.file.write(path, content );
        
        return ns;
    }
    
    
    /**
     * gets the namespace for this filepath starting from base
     * @param {string} filepath
     * @param {string} filepath
     */
    function get_namespace_js(base, path, dest)
    {
        var ret = ["window." + base + " = {};"],
            path = path.replace(/(^\/|\/$)/,'');
        
        if( path.indexOf(base) !== -1 )
        {
            path = path.substring( path.indexOf(base) );
            
            var parts = path.split("/"),
                ns = base;

            parts.forEach(function (node) 
            {
                ns += "." + node;
                ret.push(ns + " = {};");
            });
        }
        
        return ret.join("\n");
    }
    
    
    
    
    
};