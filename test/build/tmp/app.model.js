(function(ns) {


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

function CartItem(name, price)
{
    this.name = name;
    this.price = price || 0;
    
    this.result = function() { return "CartItem"; };
}

ns.Cart = Cart;
ns.CartItem = CartItem;
}(app.model));