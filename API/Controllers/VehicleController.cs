using API.DTOs;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


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

        [HttpGet("getVehicle/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<VehicleDto>> getVehicleById(long id){
            try{
            var vehicle =  await _vehicleRepository.GetVehicleByIdAsync(id);
            return _mapper.Map<VehicleDto>(vehicle);
            }catch{
                return BadRequest("Vehicle doesn't exist");
            }
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

        [HttpDelete("deleteVehicle/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Vehicle>> DeleteVehicleById(long id){
            try{
             var vehicle =  await _vehicleRepository.GetVehicleByIdAsync(id);
            await _vehicleRepository.DeleteVehicle(vehicle);
                 return Ok(vehicle);
            }catch{
                return BadRequest("Error during deleting vehicle");
            }
      
        }

      

        [HttpPost("addVehicles")]
        [Authorize]
        public async Task<ActionResult<Vehicle>> AddVehicle(Vehicle vehicle){
            
             var newVehicle = new Vehicle{
                Type = vehicle.Type,
                Brand = vehicle.Brand,
                Model = vehicle.Model,
                Color = vehicle.Color,
                Power = vehicle.Power,
                Fuel = vehicle.Fuel,
                Gearbox = vehicle.Gearbox,
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