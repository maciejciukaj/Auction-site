
using API.DTOs;
using API.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

namespace API.Controllers
{
    public class EmailController : BaseApiController
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("sendEmail")]
        public IActionResult SendEmail(EmailDto request)
        {
            _emailService.SendEmail(request);
            return Ok();
        }
    }
}