/*
* grunt-namespacer
* https://github.com/jasonsavage/grunt-namespacer
*
* Copyright (c) 2014 jasonsavage
* Licensed under the MIT license.
* 
* based on grunt-autowrap by Vontio with help taken from grunt-wrap by Christopher Rogers
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
        
        this.files.forEach(function (config) 
        {
            //task listed in the config for this task

            //remove trailing /'s from src and dest
            var src     = config.src.toString().replace(/(\/$)/,''),
                dest    = config.dest.toString().replace(/(\/$)/,''),
                
            //get the starting namespace based on src
                baseDir = src.substring(src.lastIndexOf('/')+1),
            
            //get the starting namespace
                base = ('name' in config) ? config.name : baseDir,
            
            //variable for final file name
                outputFile = base + ".js",
                
            //tracks all root namespaces created
                namespaces = [],
            
            //map file namespaces to file paths
                namespaceMap = {};
            
            //get final file name from dest if it not a directory
            if( dest.indexOf('.js') !== -1 )
            {
                var i = dest.lastIndexOf('/');
                outputFile = dest.substring(i+1);
                dest = dest.substring(0, i);
            }
            
            //loop through each file and build out namespace
            grunt.file.expand(src + "/**/*.js").forEach(function(path)
            {
                var ns      = path.substring(path.indexOf(baseDir), path.lastIndexOf('.js')).replace(/\//g, '.').replace(baseDir, base),
                    root    = ns.substring(0, ns.lastIndexOf('.'));
                    content = grunt.file.read(path);
                
                //proccess content
                content = addNamespaceExports(content);
                content = addWrapper(root, content);

                //write each file out to tmp directory
                var path = dest + '/tmp/' + ns + '.js';
                grunt.file.write(path, content);
                
                //add namespace root to array
                if(namespaces.indexOf(root) === -1 )
                    namespaces.push(root);
                
                //add to source mapping
                namespaceMap[ns] = path;

            });
            
            //sort files so that any @require namespaces listed in a file comes before that file
            var sorted = sortNamespaces(namespaceMap);
            
            //sort root namespace array
            namespaces.sort();
 
            //write namespaces file to tmp directory
            grunt.file.write(dest + '/tmp/00_ns.js', getNamespaceJS( namespaces ) );
            
            //add ns header to map
            namespaceMap['app.ns'] = dest + '/tmp/00_ns.js';
            sorted.unshift("app.ns");
            
            //concat all files together based on sorted array
            var content = concatFilesInOrder(sorted, namespaceMap, "\n\r");

            //add wrapper
            content = addWrapper('window', content);
            
            //save
            grunt.file.write(dest + '/' + outputFile, content );
            
            //remove tmp folder
            grunt.file.delete(dest + '/tmp');
            
            //end
        });
    });
    

    function sortNamespaces(namespaceMap)
    {
        var sorted = [];
        for(var ns in namespaceMap)
        {
            var path = namespaceMap[ns],
                requires = getRequires(path);
                
            requires.forEach(function(rns)
            {
                var index = sorted.indexOf(rns);
                if( index !== -1)
                    sorted.splice(index, 1);
                    
                sorted.unshift(rns);
            });
            
            if( sorted.indexOf(ns) === -1 )
                sorted.push(ns);
        }

        return sorted;
    }
    
    function getRequires(path)
    {
        var content = grunt.file.read(path),
            matches = content.match(/@require\s([^;]+);/g) || [],
            requires = matches.map(function(match)
            {
                return match.replace(/@require\s([^;]+);/g, '$1');
            });
        return requires;
    }
    
    function concatFilesInOrder(sorted, filePathMap, separator)
    {
        return sorted.map(function(key) {
            var path = filePathMap[key];
            return grunt.file.read(path);
        }).join(grunt.util.normalizelf(separator));
    }
    
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
            exports = ( matches !== null ) ? matches.map(function(str)
            {
                return str.replace(/function\s+(\w+)\(/, 'ns.$1 = $1;')
                          .replace(/var\s+(\w+)\s+=\s+function\(/, 'ns.$1 = $1;');
            }) : [];
        
        return content + '\n\n' + exports.join('\n');
    }
    
    function getNamespaceJS(namespaces)
    {
        return namespaces.map(function(ns) {
            return 'ns.' + ns + ' = {};';
        }).join('\r\n');
    }
};