using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Offer
    {
         public long OfferId { get; set; }

         public float OfferAmount {get;set;}

       
       
        public long AuctionId {get; set;}
        public Auction Auction {get; set;}


       
        public long UserId {get; set;}
        public  User User {get; set;}

       
        
       


    }
}