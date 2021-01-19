using System;
using System.Collections.Generic;
using System.Text;

namespace ChatApp.Model
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Boolean IsConnected { get; set; }
        public string ConnectionId { get; set; }
    }
}
