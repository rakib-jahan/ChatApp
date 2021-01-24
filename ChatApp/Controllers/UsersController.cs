using ChatApp.Model;
using ChatApp.Models;
using ChatApp.Service;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ChatApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUser _service;

        public UsersController(IUser service)
        {
            _service = service;
        }

        [HttpGet("allUsers")]
        public List<UserViewModel> GetAllUsers()
        {
            return _service.GetAllUsers();
        }

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
