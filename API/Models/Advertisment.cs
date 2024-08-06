using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Advertisment
    {
        public long AdvertismentId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Price { get; set; }

        public long VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

        public long UserId { get; set; }

        public User User { get; set; }

    }
}