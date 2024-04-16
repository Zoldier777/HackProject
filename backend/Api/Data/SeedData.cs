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

                var sportsProducts = faker.RuleFor(product => product.Name, (f, product) => GenerateSportsProductName(f, "Sports"))
                    .RuleFor(product => product.Description, f => f.Rant.Review())
                    .RuleFor(product => product.Price, f => f.Random.Int(0, 1000))
                    .RuleFor(product => product.Category, f => "Sports")
                    .RuleFor(product => product.Condition, f => f.Random.Bool() ? "Mint" : "Used")
                    .Generate(5);

                var electronicsProducts = faker.RuleFor(product => product.Name, (f, product) => GenerateElectronicsProductName(f, "Electronics"))
                    .RuleFor(product => product.Description, f => f.Rant.Review())
                    .RuleFor(product => product.Price, f => f.Random.Int(0, 1000))
                    .RuleFor(product => product.Category, f => "Electronics")
                    .RuleFor(product => product.Condition, f => f.Random.Bool() ? "Mint" : "Used")
                    .Generate(5);

                var clothingProducts = faker.RuleFor(product => product.Name, (f, product) => GenerateClothingProductName(f, "Clothing"))
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

        // Product name generation methods for each category
        static string GenerateClothingProductName(Faker f, string category)
        {
            string[] clothingAdjectives = { "Stylish", "Fashionable", "Trendy", "Chic", "Elegant", "Comfy", "Classic", "Vintage", "Modern" };
            string[] clothingNouns = { "Shirt", "Dress", "Jeans", "Skirt", "Jacket", "Blouse", "Sweater", "Trousers", "Coat" };

            string adjective = f.PickRandom(clothingAdjectives);
            string noun = f.PickRandom(clothingNouns);

            return $"{adjective} {noun}";
        }

        static string GenerateElectronicsProductName(Faker f, string category)
        {
            string[] electronicsAdjectives = { "Smart", "Advanced", "Innovative", "Tech", "High-Tech", "Sleek", "Compact", "Powerful" };
            string[] electronicsNouns = { "Phone", "Laptop", "Tablet", "Smartwatch", "Camera", "Headphones", "Speaker", "Drone", "Gaming Console" };

            string adjective = f.PickRandom(electronicsAdjectives);
            string noun = f.PickRandom(electronicsNouns);

            return $"{adjective} {noun}";
        }

        static string GenerateSportsProductName(Faker f, string category)
        {
            string[] sportsAdjectives = { "Durable", "High-Performance", "Athletic", "Sporty", "Rugged", "Versatile", "Training", "Outdoor" };
            string[] sportsNouns = { "Shoes", "Jersey", "Ball", "Gloves", "Bike", "Treadmill", "Weights", "Racket", "Helmet" };

            string adjective = f.PickRandom(sportsAdjectives);
            string noun = f.PickRandom(sportsNouns);

            return $"{adjective} {noun}";
        }
    }
}
