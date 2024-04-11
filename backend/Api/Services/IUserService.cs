using Models;

namespace Api.Services;

public interface IUserService
{
    User CreateUser(User user);
    User? GetUserByEmail(string email);

    User? GetUserById(int id);
}