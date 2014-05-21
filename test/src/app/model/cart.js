

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