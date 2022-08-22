using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DTOs
{
    public class MemberDto
    {
        public long UserId {get; set;}
        public string Username {get; set;}

        public int Status {get; set;}

        public string FirstName {get; set;}

        public string LastName {get; set;}

        public string Email {get; set;}

        public string PhoneNumber {get; set;}


        public  ICollection<Offer> Offers {get; set;}

        public ICollection<Auction> Auctions {get; set;}

        public ICollection<VehicleDto> Vehicles {get; set;}

        public ICollection<AdvertismentDto> Advertisments {get; set;}
    }
}