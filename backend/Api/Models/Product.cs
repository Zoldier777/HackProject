using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Product
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    [Column(TypeName = "decimal(20,4)")]
    public required decimal Price { get; set; }
}