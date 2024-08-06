using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PriceEditDto
    {
        public long AuctionId { get; set; }
        public float UserOffer { get; set; }

        public string Username { get; set; }
    }
}