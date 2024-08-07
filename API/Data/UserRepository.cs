using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {

        private readonly AuctionContext _context;
        public UserRepository(AuctionContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.Include(v => v.Vehicles).Include(a => a.Advertisments).Include(o => o.Offers).Include(x => x.Auctions).AsSplitQuery().ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(long id)
        {
            return await _context.Users.Include(a => a.Advertisments).Include(a => a.Vehicles).Include(a => a.Auctions).AsSplitQuery().FirstOrDefaultAsync(i => i.UserId == id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.Include(v => v.Vehicles).Include(a => a.Advertisments).Include(o => o.Offers).Include(x => x.Auctions).AsSplitQuery().SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}