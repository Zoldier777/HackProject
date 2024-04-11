using Api.Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Services;

public class UserService(AppDbContext context) : IUserService
{
    public User CreateUser(User user)
    {
        context.Users.Add(user);
        user.Id = context.SaveChanges();

        return user;
    }

    public User? GetUserByEmail(string email)
    {
        return context.Users.FirstOrDefault(u => u.Email == email);
    }

    public User? GetUserById(int id)
    {
        return context.Users.FirstOrDefault(u => u.Id == id);
    }
}