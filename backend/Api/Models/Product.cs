using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Models;

public class Product
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public required int Price { get; set; }
    public required string Description { get; set; }
    public required string Condition { get; set; }
    public required string Category { get; set; }
    public DateTime PostedAtDate { get; set; } = DateTime.Now;
    
    // Navigation property
    [JsonIgnore]
    public User user { get; set; }
}