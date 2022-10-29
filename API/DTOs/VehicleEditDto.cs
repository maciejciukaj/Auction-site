using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class VehicleEditDto
    {
        public long VehicleId {get; set;}
         public string Type {get;set;}

        public string Brand {get;set;}

        public string Model {get;set;}

         public string Fuel{get; set;}

        public string Gearbox {get; set;}

        public string Color {get;set;}

        public int? Power {get;set;}

        public float? Engine{get;set;}

        public bool IsCrashed{get;set;}

        public int? Mileage{get;set;}

        public int? ProductionYear{get;set;}
    }
}