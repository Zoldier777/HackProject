using Models;

namespace Api.Services;

public interface IProductService
{
    Task<List<Product>> GetXByOffset(int offset, int number);
    Task<Product?> GetProductByID(int id);
    Task<Product> CreateCd(string name, string description, int Price, string Condition);
}