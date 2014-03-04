

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

Cart.prototype.result = function() { return "Cart"; };