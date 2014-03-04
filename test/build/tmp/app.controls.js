(function(ns) {


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