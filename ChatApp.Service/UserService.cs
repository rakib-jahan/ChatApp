using ChatApp.DataAccess;
using ChatApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ChatApp.Service
{
    public class UserService : IUserService
    {
        private IRepository<User> _repository;

        public UserService(IRepository<User> repository)
        {
            _repository = repository;
        }

        public User GetUserByEmail(string email)
        {
            return _repository.FindByCondition(x => x.Email.Equals(email)).FirstOrDefault();
        }
    }
}
