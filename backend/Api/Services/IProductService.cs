using Models;

namespace Api.Services;

public interface IProductService
{
    Task<List<Product>> GetNumberOfLatestProductsByOffset(int offset, int number, string category);
    Task<Product?> GetProductByID(int id);
    Task<Product> CreateProduct(string name, string description, int Price, string Condition, string category, User userid);
    Task<List<string>> GetAllProductCategories();
}