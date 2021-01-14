using ChatApp.Model;
using ChatApp.Repository;
using ChatApp.Repository.Entity;
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
                    LastName = user.LastName
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
                LastName = user.LastName
            };

            _repository.Create(users);
        }
    }
}
