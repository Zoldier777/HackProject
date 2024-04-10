using Models;

namespace Api.Services;

public interface IProductService
{
    Task<List<Product>> GetNumberOfLatestProductsByOffset(int offset, int number);
    Task<Product?> GetProductByID(int id);
    Task<Product> CreateProduct(string name, string description, int Price, string Condition, string category);
}