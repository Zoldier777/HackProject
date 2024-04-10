using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Product { get; set; } = default!;
}