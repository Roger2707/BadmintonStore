using BackEnd.Data;
using BackEnd.Entities;

namespace BackEnd.Extensions
{
    public static class ProductExtension
    {
        public static IQueryable<Product> SortProduct(this IQueryable<Product> query, string orderBy)
        {
            if(String.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.Name);

            switch(orderBy)
            {
                case "price":
                    return query.OrderBy(p => p.Price);
                case "priceDesc":
                    return query.OrderByDescending(p => p.Price);
                default:
                    return query.OrderBy(p => p.Name);  
            }
        }

        public static IQueryable<Product> SearchProduct(this IQueryable<Product> query, string searchTerm)
        {
            if (String.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearch = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearch));
        }

        public static IQueryable<Product> FiltersProduct(this IQueryable<Product> query, string category, string brand)
        {
            var categoryList = new List<string>();
            var brandList = new List<string>();

            if (!String.IsNullOrEmpty(category)) categoryList.AddRange(category.ToLower().Split(',').ToList());
            if (!String.IsNullOrEmpty(brand)) brandList.AddRange(brand.ToLower().Split(',').ToList());

            query = query.Where(p => categoryList.Count == 0 || categoryList.Contains(p.Category.Name.ToLower()));
            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.Name.ToLower()));

            return query;
        }
    }
}
