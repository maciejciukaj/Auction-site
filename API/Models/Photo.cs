using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Photo
    {
        public long photoId {get; set;}

        public byte[] content { get; set; }
    }
}