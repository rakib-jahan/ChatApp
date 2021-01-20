using ChatApp.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChatApp.Service
{
    public interface IChat
    {
        void AddChat(MessageViewModel message);
        List<MessageViewModel> GetChatHistory(int senderId, int receiverId);
    }
}
