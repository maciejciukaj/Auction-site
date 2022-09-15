using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IUserRepository _userRepository;

        private readonly IMapper _mapper;

        public UserController (IUserRepository userRepository, IMapper mapper){
            _userRepository = userRepository;
            _mapper = mapper;
        }
        
        [HttpPut("editUsername")]
        [Authorize]
        public async Task<IActionResult> EditUsername(UsereditDto usereditmodel){
            var user =  await _userRepository.GetUserByUsernameAsync(usereditmodel.UserName);
            user.FirstName = usereditmodel.FirstName ?? user.FirstName;
            user.LastName = usereditmodel.LastName ?? user.LastName;
            user.Email = usereditmodel.Email ?? user.Email;
            user.PhoneNumber = usereditmodel.PhoneNumber ?? user.PhoneNumber;
            try{
               await _userRepository.SaveAllAsync();
                return Ok(usereditmodel);
            }catch{
                return BadRequest("User was not updated");
            }
        }

        [HttpPut("changePassword")]
        [AllowAnonymous ]
        public async Task <IActionResult> ChangePassword(PasswordSchemeDto userNewPassword){
           
            var user =  await _userRepository.GetUserByUsernameAsync(userNewPassword.UserName);
              
           
            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userNewPassword.NewPassword));
            user.PasswordSalt = hmac.Key;
            try{
               await _userRepository.SaveAllAsync();
                return Ok(userNewPassword);
            }catch{
                return BadRequest("Password was not updated");
            }
        }

        [HttpGet("getUsers")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){
            
            
           var users = await _userRepository.GetUsersAsync();

           var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
           return Ok(usersToReturn);
        }

        
        // [HttpGet("getUsersById/{id}")]
        // public async Task<ActionResult<User>> GetUser(long id){
        //     return await _userRepository.GetUserByIdAsync(id);
           
        // }

        [HttpGet("getUsers/{name}")]
        [Authorize]
        public async Task<ActionResult<MemberDto>> GetUser(string name){
            
            var user =  await _userRepository.GetUserByUsernameAsync(name);
            return _mapper.Map<MemberDto>(user);
           
        }

         [HttpGet("getUserPosts/{name}")]
         [Authorize]
        public async Task<ActionResult<IEnumerable<AdvertismentDto>>> GetUserPost(string name){
            
            var user =  await _userRepository.GetUserByUsernameAsync(name);
            var adverts = user.Advertisments.ToList();
            var toReturn =  _mapper.Map<IEnumerable<AdvertismentDto>>(adverts);
            return Ok(toReturn);
           
        }


        
    }
}