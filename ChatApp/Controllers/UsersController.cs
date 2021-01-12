using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly IUserService _repository;

        public UsersController(IUserService repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public UserViewModel Get(string email)
        {
            var user = _repository.GetUserByEmail(email);

            return new UserViewModel()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(string email)
        {
            var user = _repository.GetUserByEmail(email);

            if (user == null)
                return BadRequest(new { message = "Username not found" });

            return Ok(new UserViewModel()
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email
                }
            );
        }
    }
}
