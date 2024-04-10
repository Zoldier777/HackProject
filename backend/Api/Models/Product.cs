using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Product
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public required int Price { get; set; }
    public required string Description { get; set; }
    public string Condition { get; set; }
    public DateTime PostedAtDate { get; set; } = DateTime.Now;
}