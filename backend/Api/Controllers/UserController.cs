using Api.Dtos;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService service) : ControllerBase
    {
        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("register")]
        public async Task<ActionResult<User>> PostUser(RegisterDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            }
                
            var User =  await service.CreateUser(user);
            return Created("success", service.CreateUser(user));

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login (LoginDto dto)
        {
            var user = await service.GetUserByEmail(dto.Email);

            if (user == null) return BadRequest( new {message = "invalid credentials"});

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest( new {message = "invalid credentials"});
            }

            return Ok(user);
        }

       
    }
}
