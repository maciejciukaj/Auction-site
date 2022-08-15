using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Vehicle
    {
        public long VehicleId {get; set;}

        public string Type {get;set;}

        public string Brand {get;set;}

        public string Model {get;set;}

        public float Price{get;set;}

        public string Color {get;set;}

        public int Power {get;set;}

        public float Engine{get;set;}

        public bool IsCrashed{get;set;}

        public int Mileage{get;set;}

        public int ProductionYear{get;set;}

        public ICollection<Auction> Auctions {get; set;}

        public ICollection<Advertisment> Advertisments {get; set;}

        public User User {get; set;}
        }
}