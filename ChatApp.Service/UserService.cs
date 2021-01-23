using ChatApp.Model;
using ChatApp.Repository;
using ChatApp.Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Service
{
    public class UserService : IUser, IChat
    {
        private IRepository<User> _userRepository;
        private IRepository<ChatHistory> _chatRepository;

        public UserService(IRepository<User> userRepo, IRepository<ChatHistory> chatRepo)
        {
            _userRepository = userRepo;
            _chatRepository = chatRepo;
        }

        public UserViewModel GetUserByEmail(string email)
        {
            var user = _userRepository.FindByCondition(x => x.Email.Equals(email)).FirstOrDefault();

            if (user != null)
            {
                return new UserViewModel()
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ConnectionId = user.ConnectionId,
                    IsConnected = user.IsConnected
                };
            }
            else
                return null;
        }

        public List<UserViewModel> GetAllConnectedUsers()
        {
            var connectedUsers = new List<UserViewModel>();
            var users = _userRepository.FindByCondition(x => x.IsConnected.Equals(true));

            foreach (var u in users)
            {
                connectedUsers.Add(new UserViewModel()
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    IsConnected = u.IsConnected,
                    ConnectionId = u.ConnectionId
                });
            }

            return connectedUsers;
        }

        public UserViewModel GetUserById(int id)
        {
            var user = _userRepository.FindByCondition(x => x.Id.Equals(id)).FirstOrDefault();

            if (user != null)
            {
                return new UserViewModel()
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ConnectionId = user.ConnectionId,
                    IsConnected = user.IsConnected
                };
            }
            else
                return null;
        }

        public void RegisterUser(UserViewModel user)
        {
            var users = new User()
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsConnected = false
            };

            _userRepository.Create(users);
        }

        public void UpdateUser(UserViewModel user)
        {
            var users = new User()
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ConnectionId = user.ConnectionId,
                IsConnected = user.IsConnected
            };

            _userRepository.Update(users);
        }

        public async Task<MessageViewModel> AddChat(MessageViewModel message)
        {
            var chatHistory = new ChatHistory()
            {
                Id = message.Id,
                SenderId = message.SenderId,
                ReceiverId = message.ReceiverId,
                Message = message.Message,
                CreatedOn = DateTime.Now,
                IsDeleted = false
            };

            var ret = await _chatRepository.AsyncCreate(chatHistory);
            message.Id = ret.Id;

            return message;
        }

        public void UpdateChat(int id)
        {
            var message = _chatRepository.FindByCondition(x => x.Id.Equals(id)).FirstOrDefault();
            message.IsDeleted = true;
            _chatRepository.Update(message);
        }

        public List<MessageViewModel> GetChatHistory(int senderId, int receiverId)
        {
            var chatHistory = new List<MessageViewModel>();
            var chats = _chatRepository.FindByCondition(x =>
            (
                x.SenderId.Equals(senderId) && x.ReceiverId.Equals(receiverId)) ||
                x.SenderId.Equals(receiverId) && x.ReceiverId.Equals(senderId)
            );

            foreach (var chat in chats)
            {
                chatHistory.Add(new MessageViewModel()
                {
                    Id = chat.Id,
                    SenderId = chat.SenderId,
                    ReceiverId = chat.ReceiverId,
                    Message = chat.Message,
                    Date = chat.CreatedOn,
                    IsDeleted = chat.IsDeleted
                });
            }

            return chatHistory;
        }
    }
}
