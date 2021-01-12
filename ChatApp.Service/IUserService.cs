using ChatApp.DataAccess;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChatApp.Service
{
    public interface IUserService
    {
        User GetUserByEmail(string email);
    }
}