using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IUserRepository _userRepository;

        public UserController (IUserRepository userRepository){
            _userRepository = userRepository;
        }
        
        [HttpPut("editUsername")]
        [AllowAnonymous]
        public async Task<IActionResult> EditUsername(UsereditDto usereditmodel){
            var user =  await _userRepository.GetUserByUsernameAsync(usereditmodel.UserName);
            user.FirstName = usereditmodel.FirstName ?? user.FirstName;
            user.LastName = usereditmodel.LastName ?? user.LastName;
            user.Email = usereditmodel.Email ?? user.Email;
            user.PhoneNumber = usereditmodel.PhoneNumber ?? user.PhoneNumber;
            try{
               await _userRepository.SaveAllAsyc();
                return Ok(usereditmodel);
            }catch{
                return BadRequest("User was not updated");
            }
           
           
            
        }

        [HttpGet("getUsers")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(){
            
            
           var users = await _userRepository.GetUserAsync();
           return Ok(users);
        }

        
        // [HttpGet("getUsersById/{id}")]
        // public async Task<ActionResult<User>> GetUser(long id){
        //     return await _userRepository.GetUserByIdAsync(id);
           
        // }

        [HttpGet("getUsers/{name}")]
        public async Task<ActionResult<User>> GetUser(string name){
            return await _userRepository.GetUserByUsernameAsync(name);
           
        }
    }
}