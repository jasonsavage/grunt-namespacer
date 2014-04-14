grunt-namespacer
================

Concat and scope wraps JavaScript files into namespaces based on your projects folder structure.

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
* + app/
	* + controls/
		* + checkboxes.js
	* + models/
		* + vo/
			* - person.js
		* - cartItem.js
		* - cart.js
	* + utils/
		* - contains.js
		* - empty.js
		* - firstToUpper.js
		* - substitute.js
	* - init.js

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

Any functions/variables that are in files in the same folders are considered in the same namespace, so be careful not to overwrite a var value or function by accident.

```javascript

//app/helpers/cartHelper.js
var appId = 4577694;
var storeId = 79;
function getCart(id) { }
function getUsers(id, store) { }
 
//app/helpers/facebook.js
var appId = '49865328751';
function getUserFriendsList(id) { }
function getUsers(id) { }
 
//since these 2 files are in the same folder, the value of variable 'appId' will
//end up being whichever file gets written last. (probably '49865328751' from facebook.js)
//same goes for the 'getUsers' method.
 
//on the other hand 'facebook.js' can access the 'getCart' method just by name and not namespace
//app/helpers/facebook.js
var cart = getCart( facebookId );
//instead of
var cart = app.helpers.getCart( facebookId );

```

## License

Copyright (c) 2014 Jason Savage
Licensed under the MIT license.