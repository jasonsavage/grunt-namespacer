(function(ns) {
ns.app = {};
ns.app.controls = {};
ns.app.model = {};
ns.app.model.vo = {};
ns.app.utils = {};
(function(ns) {



function CartItem(name, price)
{
    this.name = name;
    this.price = price || 0;
    
    this.result = function() { return "CartItem"; };
}

ns.CartItem = CartItem;
}(app.model));
(function(ns) {

var Person = function()
{
    this.result = function() { return "Person"; };
};

function Jason()
{
    this.result = function() { return "Jason"; };
}
Jason.prototype = new Person();

ns.Person = Person;
ns.Jason = Jason;
}(app.model.vo));
(function(ns) {


//@require app.model.cartItem;

function Cart()
{
    this.items = [];
    
    this.count = function()
    {
        return this.items.length;
    };
    
    this.addItem = function( item )
    {
        this.item.push(item);
    };
}

var temp = Cart.prototype = new app.model.CartItem();

Cart.prototype.result = function() { return "Cart"; };

ns.Cart = Cart;
}(app.model));
(function(ns) {


//@require app.model.cart;
//@require app.model.vo.person;

var event_select_change = 'selectChange';

function Checkbox( $elements )
{
    this.result = function() { return "Checkbox"; };
}

function CheckboxGroup( $elements )
{
    this.result = function() { return "CheckboxGroup"; };
    this.update = function()
    {
        return _update();
    };
}

var _update = function( $context )
{
    return "_update (hidden)";
};

ns.Checkbox = Checkbox;
ns.CheckboxGroup = CheckboxGroup;
}(app.controls));
(function(ns) {

function init()
{
    return "init";
}

ns.init = init;
}(app));
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

ns.contains = contains;
ns.showTest = showTest;
}(app.utils));
(function(ns) {


/**
 * checks if the supplied [object] is empty. 
 * @param {Object} str
 */
function empty(obj)
{
    if(typeof obj === 'undefined' || obj === null || obj === '' || obj === false) return true; //empty
    if(typeof obj === 'number' && obj > 0) return false;
    if(typeof obj === 'boolean' && obj) return false;
    if(typeof obj === 'object') for(var item in obj) return false;
    
    return true;
}

ns.empty = empty;
}(app.utils));
(function(ns) {


/**
 * sets the first character of each word to uppercase 
 * @param {string} value
 */
function firstToUpper(value)
{
    return value.charAt(0).toUpperCase() + value.substr(1);
}

ns.firstToUpper = firstToUpper;
}(app.utils));
(function(ns) {


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
    while(i--) msg = msg.replace("/{"+i+"}/g", args[i]);
    return msg;
}

ns.substitute = substitute;
}(app.utils));
}(window));