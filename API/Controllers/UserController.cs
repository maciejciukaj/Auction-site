using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly AuctionContext _context;

        public UserController (AuctionContext context){
            _context = context;
        }

        [HttpGet("getUsers")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(){
            
            return await _context.Users.ToListAsync();
        }

        
        [HttpGet("getUsers/{id}")]
        public async Task<ActionResult<User>> GetUser(long id){
            return await _context.Users.FindAsync(id);
           
        }
    }
}