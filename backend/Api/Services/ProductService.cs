using Api.Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Services;

public class ProductService(AppDbContext context) : IProductService
{
    public async Task<List<Product>> GetXProductsByOffset(int offset, int number)
    {
        var products = await context.Product
            .OrderBy(p => p.PostedAtDate) 
            .Skip(offset) 
            .Take(number) 
            .ToListAsync(); 

        return products;
    }

    public Task<Product?> GetProductByID(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<Product> CreateProduct(string name, string description, int price, string condition)
    {
        var product = new Product
        {
            Name = name,
            Description = description,
            Price = price,
            Condition = condition,
        };

        context.Product.Add(product); // Add the product to the DbSet
        await context.SaveChangesAsync(); // Save changes to the database

        return product;
    }
}