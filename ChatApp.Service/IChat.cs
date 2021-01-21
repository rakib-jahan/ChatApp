using ChatApp.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Service
{
    public interface IChat
    {
        Task AddChat(MessageViewModel message);
        List<MessageViewModel> GetChatHistory(int senderId, int receiverId);
    }
}
