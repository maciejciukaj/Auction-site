using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OfferDto
    {
        public long OfferId { get; set; }

         public float OfferAmount {get;set;}

         public long AuctionId {get; set;}

    }
}