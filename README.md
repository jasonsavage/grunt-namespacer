grunt-namespacer
================

Concats and scope wraps javascript files into namespaces based on folder structure

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: ``npm install grunt-wrap``

Then add this line to your project's ``grunt.js`` gruntfile:

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
      src: 'js/src/app/',
      dest: 'build/'
    }
  },

  // ... other configs
});
```

## Example

**folder structure**:
- app
-- controls
--- checkboxes.js
-- models
---- vo
----- person.js
--- cartItem.js
--- cart.js
-- utils
--- contains.js
--- empty.js
--- firstToUpper.js
--- substitute.js
-- init.js

```js

var car = new app.models.cart();
car.addItem( new app.models.cartItem('ham', 2) );

console.log( app.utils.firstToUpper( "foo" ) );
// Foo

```

## License
Copyright (c) 2014 Jason Savage
Licensed under the MIT license.