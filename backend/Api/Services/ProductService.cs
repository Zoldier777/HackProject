using Api.Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Services;

public class ProductService(AppDbContext context) : IProductService
{
    public async Task<List<Product>> GetNumberOfLatestProductsByOffset(int offset, int number, string category)
    {
        if (category.ToLower() != "news")
        {
            var prod = await context.Product
                .Where(p => p.Category == category)
                .Skip(offset) 
                .Take(number) 
                .ToListAsync();
            return prod;
        }
        var products = await context.Product
            .OrderBy(p => p.PostedAtDate) 
            .Skip(offset) 
            .Take(number) 
            .ToListAsync();
        return products;
    }

    public async Task<Product?> GetProductByID(int id)
    {
    return await context.Product.FindAsync(id);
    }
    
    public async Task<List<string>> GetAllProductCategories()
    {
        var categories = await context.Product
            .Select(p => p.Category)
            .Distinct()
            .ToListAsync();
        categories.Add("News");
        return categories;
    }


    public async Task<Product> CreateProduct(string name, string description, int price, string condition,string category)
    {
        var product = new Product
        {
            Name = name,
            Description = description,
            Price = price,
            Condition = condition,
            Category = category
        };

        context.Product.Add(product); // Add the product to the DbSet
        await context.SaveChangesAsync(); // Save changes to the database

        return product;
    }
}