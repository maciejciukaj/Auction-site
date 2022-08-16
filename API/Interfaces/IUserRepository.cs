using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(User user);
        Task<bool> SaveAllAsyc();

        Task<IEnumerable<User>> GetUsersAsync();

        Task<User> GetUserByIdAsync(long id);

        Task<User> GetUserByUsernameAsync(string username);

       
      
    }
}