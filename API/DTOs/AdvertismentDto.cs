using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AdvertismentDto
    {
        public long AdvertismentId{get;set;}
        public string Title{get;set;}

        public string Description{get;set;}
        public string Price {get;set;}
    }
}