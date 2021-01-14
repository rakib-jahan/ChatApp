using ChatApp.Model;

namespace ChatApp.Service
{
    public interface IUserService
    {
        UserViewModel GetUserByEmail(string email);
        void RegisterUser(UserViewModel user);
    }
}