using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
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
        
        [HttpPut("editUsername")]
        [AllowAnonymous]
        public async Task<IActionResult> EditUsername(UsereditDto usereditmodel){
            var user =  await _context.Users.Where(a => a.UserName.Equals(usereditmodel.UserName)).FirstOrDefaultAsync();
            user.FirstName = usereditmodel.FirstName ?? user.FirstName;
            user.LastName = usereditmodel.LastName ?? user.LastName;
            user.Email = usereditmodel.Email ?? user.Email;
            user.PhoneNumber = usereditmodel.PhoneNumber ?? user.PhoneNumber;
            try{
               await  _context.SaveChangesAsync();
                return Ok(usereditmodel);
            }catch{
                return BadRequest("User was not updated");
            }
           
           
            
        }

        [HttpGet("getUsers")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(){
            
            
            return await _context.Users.ToListAsync();
        }

        
        // [HttpGet("getUsers/{id}")]
        // public async Task<ActionResult<User>> GetUser(long id){
        //     return await _context.Users.FindAsync(id);
           
        // }

        [HttpGet("getUsers/{name}")]
        public async Task<ActionResult<User>> GetUser(string name){
            return await _context.Users.Where(a => a.UserName == name.ToLower()).FirstOrDefaultAsync();
           
        }
    }
}