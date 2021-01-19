using ChatApp.Model;
using System.Collections.Generic;

namespace ChatApp.Service
{
    public interface IUserService
    {
        UserViewModel GetUserById(int id);
        UserViewModel GetUserByEmail(string email);
        void RegisterUser(UserViewModel user);
        void UpdateUser(UserViewModel user);
        List<UserViewModel> GetAllConnectedUsers();
    }
}