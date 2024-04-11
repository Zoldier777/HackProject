using Api.Dtos;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService service, JWTservice jwtservice) : ControllerBase
    {
        
        [HttpPost("register")]
        public IActionResult CreateUser(RegisterDto dto)
        {
            if (service.GetUserByEmail(dto.Email) != null)
            {
                return BadRequest( new {message = "invalid credentials"});
            }
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            return Created("success", service.CreateUser(user));

        }
        [HttpPost("login")]
        public IActionResult LoginUser (LoginDto dto)
        {
            var user = service.GetUserByEmail(dto.Email);

            if (user == null) return BadRequest( new {message = "invalid credentials"});

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest( new {message = "invalid credentials"});
            }

            var jwt = jwtservice.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true 
            });

            
            return Ok( new { message = "success" });
        }
        
        [HttpGet("user")]
        public IActionResult GetUser ()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user =  service.GetUserById(userId);

               return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult UserLogout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new {message = "success" });
        }

       
    }
}
