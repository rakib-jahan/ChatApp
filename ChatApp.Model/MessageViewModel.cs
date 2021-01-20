using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Model
{
    public class MessageViewModel
    {
        public int id { get; set; }
        public int senderId { get; set; }
        public int receiverId { get; set; }
        public string receiverConnectionId { get; set; }
        public string senderConnectionId { get; set; }
        public string type { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }
    }
}
