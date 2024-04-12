using System;
using System.Collections.Generic;
using Bogus;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var _context = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());
            _context.Database.EnsureDeleted(); // Clear the database
            _context.Database.EnsureCreated(); // Create the database if not exists

            var userFaker = new Faker<User>()
                .RuleFor(user => user.Name, f => f.Name.FirstName())
                .RuleFor(user => user.Email, (f, user) => $"{user.Name.ToLower()}@example.com")
                .RuleFor(user => user.Password, f => f.Internet.Password())
                .RuleFor(user => user.SellingProducts, f => new List<Product>());

            var users = userFaker.Generate(30);

            foreach (var user in users)
            {
                var faker = new Faker<Product>();
                var sportsProducts = faker.RuleFor(product => product.Name, f => f.Commerce.Product())
                    .RuleFor(product => product.Description, f => f.Rant.Review())
                    .RuleFor(product => product.Price, f => f.Random.Int(0, 1000))
                    .RuleFor(product => product.Category, f => "Sports")
                    .RuleFor(product => product.Condition, f => f.Random.Bool() ? "Mint" : "Used")
                    .Generate(5); 

                var electronicsProducts = faker.RuleFor(product => product.Name, f => f.Commerce.Product())
                    .RuleFor(product => product.Description, f => f.Rant.Review())
                    .RuleFor(product => product.Price, f => f.Random.Int(0, 1000))
                    .RuleFor(product => product.Category, f => "Electronics")
                    .RuleFor(product => product.Condition, f => f.Random.Bool() ? "Mint" : "Used")
                    .Generate(5); 

                var clothingProducts = faker.RuleFor(product => product.Name, f => f.Commerce.Product())
                    .RuleFor(product => product.Description, f => f.Rant.Review())
                    .RuleFor(product => product.Price, f => f.Random.Int(0, 1000))
                    .RuleFor(product => product.Category, f => "Clothing")
                    .RuleFor(product => product.Condition, f => f.Random.Bool() ? "Mint" : "Used")
                    .Generate(5); 
                
                user.SellingProducts.AddRange(sportsProducts);
                user.SellingProducts.AddRange(electronicsProducts);
                user.SellingProducts.AddRange(clothingProducts);

                _context.Users.Add(user);
                _context.AddRange(sportsProducts);
                _context.AddRange(electronicsProducts);
                _context.AddRange(clothingProducts);
            }

            _context.SaveChanges();
        }
    }
}
