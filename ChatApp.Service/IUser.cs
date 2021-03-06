﻿using ChatApp.Model;
using System.Collections.Generic;

namespace ChatApp.Service
{
    public interface IUser
    {
        List<UserViewModel> GetAllUsers();
        UserViewModel GetUserById(int id);
        UserViewModel GetUserByEmail(string email);
        void RegisterUser(UserViewModel user);
        void UpdateUser(UserViewModel user);
        List<UserViewModel> GetAllConnectedUsers();
    }
}