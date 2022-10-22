using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.DTOs
{
    public class AuctionDto
    {
        public long AuctionId { get; set; }

        public string Title { get; set; }

        public string Description {get; set;}
        

        public float CurrentPrice{get;set;}

        public string CurrentBidder{get;set;}

        public DateTime Start{get;set;}
        public DateTime End {get;set;}
        
        public bool IsFinished{get;set;}

        public string AuctionWinner{get;set;}

        public ICollection<OfferDto> Offers {get; set;}

        public long VehicleId {get; set;}

        public long UserId {get; set;}


      

    }
}