/*using Bogus;
using Bogus.DataSets;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var _context = new appDbContext(
                   serviceProvider.GetRequiredService<DbContextOptions<appDbContext>>()))
        {
            _context.Database.EnsureDeleted(); // Clear the database
            _context.Database.EnsureCreated(); // Create the database if not exists

            // Generate dummy customers
            var customerFaker = new Faker<Customer>()
                .RuleFor(customer => customer.Name, f => f.Name.FullName())
                .RuleFor(customer => customer.Email, f => f.Internet.Email())
                .RuleFor(customer => customer.Phone, f => f.Phone.PhoneNumber());

            var customers = customerFaker.Generate(10); 
            _context.AddRange(customers);
            _context.SaveChanges(); 

        
            var addressFaker = new Faker<Address>()
                .RuleFor(address => address.StreetName, f => f.Address.StreetName())
                .RuleFor(address => address.StreetNo, f => f.Random.Int().ToString())
                .RuleFor(address => address.City, f => f.Address.City())
                .RuleFor(address => address.CustomerId, f => f.PickRandom(customers).Id); 

            var addresses = addressFaker.Generate(20); 
            _context.Address.AddRange(addresses);
            _context.SaveChanges();
        }
    }
}*/