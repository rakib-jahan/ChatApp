using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Model
{
    public class MessageViewModel
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string ReceiverConnectionId { get; set; }
        public string SenderConnectionId { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public Boolean IsDeleted { get; set; }
    }
}
