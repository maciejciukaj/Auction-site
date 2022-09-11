using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PhotoDto
    {
        public long PhotoId {get; set;}

        public string PhotoUrl {get; set;}

        public Boolean IsMain {get; set;}
    }
}