using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController 
    {
        private readonly AuctionContext _context;
        private readonly ITokenService _tokenService;

        private readonly IEmailService _emailService;
        public AccountController(AuctionContext context, ITokenService tokenService, IEmailService emailService)
        {
            _tokenService = tokenService;
            _context = context;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
            if(await UserExists(registerDto.UserName)) return BadRequest("Username is taken");
            using var hmac = new HMACSHA512();
            var user = new User{
                UserName = registerDto.UserName,
                Status = 0,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto{
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

         [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);
            if (user == null ) return Unauthorized("Invalid username");
            if(loginDto.Password==null) return Unauthorized("Insert your password");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i =0 ; i<computedHash.Length; i++){
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }
            return new UserDto{
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(EmailSenderDto email){
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email.email);
            if(user == null){
                return BadRequest(email);
            }
          
            user.PasswordResetToken = CreateRandomToken();
            user.ResetTokenExpires = DateTime.Now.AddDays(1);
              EmailDto resetEmail = new EmailDto{
                To = email.email,
                Body = "<h2>Password recovery</h2><br>Click this link to reset your password:<br>  https://localhost:4200/reset/" + user.PasswordResetToken+
                " It's valid for <b>24 hours</b><br><br>~ Carclub Support",
                Subject = "Password recovery"
            };

            _emailService.SendEmail(resetEmail);
            await _context.SaveChangesAsync();
            return Ok(email);
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(PasswordRecoveryDto request){
            var user = await _context.Users.FirstOrDefaultAsync(x => x.PasswordResetToken == request.token);
            if(user == null || user.ResetTokenExpires < DateTime.Now){
                return BadRequest(request);
            }
            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password));
            user.PasswordSalt = hmac.Key;
            user.PasswordResetToken =null;
            user.ResetTokenExpires = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok(request);
        }

         private async Task<bool> UserExists(string username){
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
        
        private string CreateRandomToken(){
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
    }
}