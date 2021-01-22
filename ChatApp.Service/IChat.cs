using ChatApp.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Service
{
    public interface IChat
    {
        Task<MessageViewModel> AddChat(MessageViewModel message);
        List<MessageViewModel> GetChatHistory(int senderId, int receiverId);
        void UpdateChat(int id);
    }
}
