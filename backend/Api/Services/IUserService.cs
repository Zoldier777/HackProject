using Models;

namespace Api.Services;

public interface IUserService
{
    Task<User> CreateUser(User user);
    Task<User?> GetUserByEmail(string email);
}