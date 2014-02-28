

function Cart()
{
    this.items = [];
    
    this.count = function()
    {
        return this.item.length;
    };
    
    this.addItem = function( item )
    {
        this.item.push(item);
    };
    
    
    
    console.log("Cart()");
}