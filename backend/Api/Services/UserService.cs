using Api.Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Services;

public class UserService(AppDbContext context) : IUserService
{
    public async Task<User> CreateUser(User user)
    {
        context.Users.Add(user);
        user.Id = await context.SaveChangesAsync();

        return user;
    }

    public Task<User?> GetUserByEmail(string email)
    {
        return context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
}