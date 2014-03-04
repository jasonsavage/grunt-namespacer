
function CartItem(name, price)
{
    this.name = name;
    this.price = price || 0;
    
    this.result = function() { return "CartItem"; };
}