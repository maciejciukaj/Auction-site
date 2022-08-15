using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DTOs
{
    public class VehicleDto
    {

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


        public long UserId {get; set;}
        public User User {get; set;}
       

    }
}