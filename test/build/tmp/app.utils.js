(function(ns) {


/**
 * checks if [value] contains [search]
 * @param {string} value
 * @param {string} search
 */
function contains(value, search)
{
    return value.indexOf(search) !== -1;
}

function _hideTest1() { }

var _hideTest2 = function() { };

var showTest = function() { };


/**
 * checks if the supplied [object] is empty. 
 * @param {Object} str
 */
function empty(obj)
{
    if(typeof obj === 'undefined' || obj === null || obj === '' || obj === false) return true; //empty
    if(typeof obj === 'number' && obj > 0) return false;
    if(typeof obj === 'boolean' && obj) return false;
    if(typeof obj === 'object') for(item in obj) return false;
    
    return true;
}


/**
 * sets the first character of each word to uppercase 
 * @param {string} value
 */
function firstToUpper(value)
{
    return value.charAt(0).toUpperCase() + value.substr(1);
}


/**
 * replaces {0}, {1}, {2}, etc with any arguments passed to the method in the same order 
 * @param {string} msg
 * @param {...} args
 */
function substitute(msg/*, ...args*/)
{
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    
    var i = args.length;
    while(i--) msg = msg.replace("/\{"+i+"\}/g", args[i]);
    return msg;
}

ns.contains = contains;
ns.showTest = showTest;
ns.empty = empty;
ns.firstToUpper = firstToUpper;
ns.substitute = substitute;
}(app.utils));