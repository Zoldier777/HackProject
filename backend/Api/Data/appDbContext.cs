using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
    public DbSet<Product> Product { get; set; } = default!;
    
    public DbSet<User> Users { get; set; } = default!;
}