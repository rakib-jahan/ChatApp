using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.Model;
using ChatApp.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly IChat _service;

        public ChatsController(IChat service)
        {
            _service = service;
        }

        [HttpGet("chatUsers")]
        public List<UserViewModel> GetChatUsers(int id)
        {
            return _service.GetChatUsers(id);
        }

        [HttpGet("chatLog")]
        public List<MessageViewModel> GetChatHistory(int senderId, int receiverId)
        {
            return _service.GetChatHistory(senderId, receiverId);
        }

        [HttpPost("deleteChat")]
        public void DeleteChat(int id)
        {
            _service.UpdateChat(id);
        }
    }
}
