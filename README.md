# grunt-namespacer v0.1.2

> Concats and scope wraps JavaScript files into namespaces based on your projects folder structure.

## Getting Started

This plugin requires Grunt ^0.4.2

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```Shell
npm install grunt-namespacer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-namespacer');
```

## Documentation
Configure which files to be copied in your `initConfig`:

```javascript
grunt.initConfig({

  // ... other configs

  // wrap my modules with define
  namespacer : {
    basic: {
	  //[name] - specifies the base namespace to use
	  //(defaults to subdirectory name in source)
	  name : 'core' (optional)
	  //[src] - sets the base directory to start the namespaces from 
	  // (NOTE: currently can't be an array, maybe in future releases)
      src: 'js/src/app/',
		//[dest] - filepath or directory to save output file
      dest: 'build/'
    }
  },

  // ... other configs
});
```

## Example

**If your folder structure is:**:
* app/
	* controls/
		* checkboxes.js
	* models/
		* vo/
			* person.js
		* cartItem.js
		* cart.js
	* utils/
		* contains.js
		* empty.js
		* firstToUpper.js
		* substitute.js
	* init.js

**Then after you run the task:**: 
Now you should have a file named 'app.js' (base folder name) and be able to access classes/methods like this:

```javascript
var car = new app.models.cart();
car.addItem( new app.models.cartItem('ham', 2) );

console.log( app.utils.firstToUpper( "foo" ) );
// Foo
```

## Notes

You can add an underscore '_' before a function name, If you want to have namerspacer ignore that function.

```javascript
function _updateDisplay() { }
var _getUserInfo = function() { }
```

If a file requires another file before it can run you can use the keyword "@require". This will let namespacer know the order for combining files.
```javascript
//@require app.model.cartItem;

function Product() { } 
var p = Product.prototype = new app.model.CartItem();
Product.prototype.getName = function() {
   return 'apple';
}
```

## License

Copyright (c) 2014 Jason Savage
Licensed under the MIT license.