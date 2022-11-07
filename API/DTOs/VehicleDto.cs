using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DTOs
{
    public class VehicleDto
    {
        public long VehicleId {get; set;}
        public string Type {get;set;}

        public string Brand {get;set;}

        public string Model {get;set;}

        public float Price{get;set;}
         public string Fuel{get; set;}

        public string Gearbox {get; set;}

        public string Color {get;set;}

        public int Power {get;set;}

        public float Engine{get;set;}

        public bool IsCrashed{get;set;}

        public int Mileage{get;set;}

        public int ProductionYear{get;set;}

        public ICollection<AdvertismentDto> Advertisments {get; set;}
        public ICollection<PhotoDto> Photos {get; set;}
        public ICollection<AuctionDto> Auctions {get; set;}
    }
}