using Bogus;
using Bogus.DataSets;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Data;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var _context = new AppDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());
        _context.Database.EnsureDeleted(); // Clear the database
        _context.Database.EnsureCreated(); // Create the database if not exists

        var faker = new Faker<Product>();
            
        var productsCategory1 = faker.RuleFor(product => product.Name, f => f.Commerce.Product())
            .RuleFor(product => product.Description, f => f.Rant.Review())
            .RuleFor(product => product.Price, f => f.Random.Int(0,1000))
            .RuleFor(product => product.Category, f => "Sports")
            .RuleFor(product => product.Condition, f => f.Random.Bool() ? "Mint" : "Used")
            .Generate(50);
            
        var productsCategory2 = faker.RuleFor(product => product.Name, f => f.Commerce.Product())
            .RuleFor(product => product.Description, f => f.Rant.Review())
            .RuleFor(product => product.Price, f => f.Random.Int(0,1000))
            .RuleFor(product => product.Category, f => "Electronics")
            .RuleFor(product => product.Condition, f => f.Random.Bool() ? "Mint" : "Used")
            .Generate(50);
            
        var productsCategory3 = faker.RuleFor(product => product.Name, f => f.Commerce.Product())
            .RuleFor(product => product.Description, f => f.Rant.Review())
            .RuleFor(product => product.Price, f => f.Random.Int(0,1000))
            .RuleFor(product => product.Category, f => "Clothing")
            .RuleFor(product => product.Condition, f => f.Random.Bool() ? "Mint" : "Used")
            .Generate(50);
            
        _context.AddRange(productsCategory1);
        _context.AddRange(productsCategory2);
        _context.AddRange(productsCategory3);
        _context.SaveChanges();
    }
}