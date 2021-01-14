using ChatApp.Model;
using ChatApp.Models;
using ChatApp.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChatApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        //[HttpGet]
        //public UserViewModel Get(string email)
        //{
        //    return _service.GetUserByEmail(email);
        //}

        [HttpPost("authenticate")]
        public IActionResult Authenticate(string email)
        {
            var user = _service.GetUserByEmail(email);

            if (user == null)
                return BadRequest(new { message = "Email not found" });

            return Ok(new UserViewModel()
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email
                }
            );
        }

        [HttpPost("register")]
        public IActionResult Register(UserViewModel user)
        {
            try
            {
                if (_service.GetUserByEmail(user.Email) != null)
                    return BadRequest(new { message = "Email already exists" });

                _service.RegisterUser(user);
            }
            catch (System.Exception)
            {
                return BadRequest(new { message = "User not created" });
            }

            return Ok();
        }
    }
}
