
using System.Text.Json.Serialization;

namespace Models;

public class User
{
    
    public int Id { get; set;}
    public string Name { get; set;}
    public string Email { get; set;}
    [System.Text.Json.Serialization.JsonIgnore]
    public string Password { get; set;}
     [JsonIgnore]
    public List<Product> SellingProducts { get; set; }
}