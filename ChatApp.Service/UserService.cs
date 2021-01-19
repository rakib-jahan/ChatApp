using ChatApp.Model;
using ChatApp.Repository;
using ChatApp.Repository.Entity;
using System.Collections.Generic;
using System.Linq;

namespace ChatApp.Service
{
    public class UserService : IUserService
    {
        private IRepository<User> _repository;

        public UserService(IRepository<User> repository)
        {
            _repository = repository;
        }

        public UserViewModel GetUserByEmail(string email)
        {
            var user = _repository.FindByCondition(x => x.Email.Equals(email)).FirstOrDefault();

            if (user != null)
            {
                return new UserViewModel() {
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
            var users = _repository.FindByCondition(x => x.IsConnected.Equals(true));

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
            var user = _repository.FindByCondition(x => x.Id.Equals(id)).FirstOrDefault();

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

            _repository.Create(users);
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

            _repository.Update(users);
        }
    }
}
