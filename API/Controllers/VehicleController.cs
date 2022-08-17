using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

        //nie tworzyc zbioru z pojazdami bo to bezsensu, lepiej stworzyc pojazd i dodac do listy Usera

    public class VehicleController : BaseApiController
    {
        
        private readonly AuctionContext _context;
        public VehicleController(AuctionContext context){
            _context = context;
        }

        [HttpGet("getVehicles")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles(){
            
            
            return await _context.Vehicles.ToListAsync();
        }

        [HttpPost("addVehicles")]
        [AllowAnonymous]
        public async Task<ActionResult<Vehicle>> AddVehicle(Vehicle vehicle){
            
             var newVehicle = new Vehicle{
                Type = vehicle.Type,
                Brand = vehicle.Brand,
                Model = vehicle.Model,
                Color = vehicle.Color,
                Power = vehicle.Power,
                Engine = vehicle.Engine,
                IsCrashed = vehicle.IsCrashed,
                Mileage = vehicle.Mileage,
                ProductionYear = vehicle.ProductionYear,
                UserId = vehicle.UserId
            };

            _context.Vehicles.Add(newVehicle);
            await _context.SaveChangesAsync();

            return newVehicle;

        
        }



    }
}