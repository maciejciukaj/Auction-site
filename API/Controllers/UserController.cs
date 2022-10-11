using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        [Authorize ]
        public async Task <IActionResult> ChangePassword(PasswordSchemeDto userNewPassword){

            var user =  await _userRepository.GetUserByUsernameAsync(userNewPassword.UserName);

            using var hmacCheck = new HMACSHA512(user.PasswordSalt);
            
            var computedHash = hmacCheck.ComputeHash(Encoding.UTF8.GetBytes(userNewPassword.OldPassword));
           
           
            for (int i =0 ; i<computedHash.Length; i++){
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");

            }
           
           
              
           
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

        
        

        [HttpGet("getUsers/{name}")]
        [AllowAnonymous]
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


        [HttpGet("getUserById/{id}")]
        public async Task<ActionResult<MemberDto>> GetUserById(long id){
             var user =  await _userRepository.GetUserByIdAsync(id);
             return _mapper.Map<MemberDto>(user);
        }

       


        
    }
}