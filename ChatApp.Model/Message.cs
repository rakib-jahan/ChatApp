using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Model
{
    public class Message
    {
        public string receiverConnectionId { get; set; }
        public string senderConnectionId { get; set; }
        public string type { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }
    }
}
