
var Person = function()
{
    this.result = function() { return "Person"; };
};

function Jason()
{
    this.result = function() { return "Jason"; };
}
Jason.prototype = new Person();