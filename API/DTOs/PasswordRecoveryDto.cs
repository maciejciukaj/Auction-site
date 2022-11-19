using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PasswordRecoveryDto
    {
        public string token {get; set;}

        public string Password {get; set;}
    }
}