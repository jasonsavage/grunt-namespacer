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