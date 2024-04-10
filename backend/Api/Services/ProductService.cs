using Models;

namespace Api.Services;

public class ProductService() : IProductService
{
    public Task<List<Product>> GetXByOffset(int offset, int number)
    {
        throw new NotImplementedException();
    }

    public Task<Product?> GetProductByID(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Product> CreateCd(string name, string description, int Price, string Condition)
    {
        throw new NotImplementedException();
    }
}