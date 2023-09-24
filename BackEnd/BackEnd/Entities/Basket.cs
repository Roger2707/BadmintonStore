namespace BackEnd.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> BasketItems { get; set; } = new();
        public void AddToBasket(Product product, int quantity)
        {
            var existedProduct = BasketItems.FirstOrDefault(x => x.ProductId == product.Id);
            if (existedProduct != null) existedProduct.Quantity += quantity;
            else BasketItems.Add(new BasketItem { Product = product, Quantity = quantity });
        }

        public void RemoveFromBasket(int productId, int quantity)
        {
            var existedProduct = BasketItems.FirstOrDefault(x => x.ProductId == productId);
            if (existedProduct == null) return;
            existedProduct.Quantity -= quantity;
            if(existedProduct.Quantity == 0) BasketItems.Remove(existedProduct);
        }   
    }
}
