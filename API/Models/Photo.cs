using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Photo
    {
        public long photoId { get; set; }

        public string PhotoUrl { get; set; }

        public int Position { get; set; }

        public Boolean IsMain { get; set; }

        public long VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}