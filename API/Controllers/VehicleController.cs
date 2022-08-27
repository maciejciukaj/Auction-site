using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

        

    public class VehicleController : BaseApiController
    {
        

         private readonly IMapper _mapper;

         private readonly IVehicleRepository _vehicleRepository;

        
        public VehicleController( IMapper mapper, IVehicleRepository vehicleRepository){
            
            _mapper = mapper;
            _vehicleRepository = vehicleRepository;
        }

        [HttpGet("getVehicles")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetVehicles(){
            
            var vehicles =  await _vehicleRepository.GetVehiclesAsync();

            var vehiclesToReturn = _mapper.Map<IEnumerable<VehicleDto>>(vehicles);
            return Ok(vehiclesToReturn);

        }

        /*
 [HttpGet("getUsers")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){
            
            
           var users = await _userRepository.GetUsersAsync();

           var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
           return Ok(usersToReturn);
        }
        */

      

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

            //_context.Vehicles.Add(newVehicle);
            _vehicleRepository.AddVehicle(newVehicle);
            await _vehicleRepository.SaveAllAsyc();

            return newVehicle;

        
        }



    }
}