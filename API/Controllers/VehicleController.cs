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




        [HttpDelete("deleteVehicle/{id}")]
        [Authorize]
        public async Task<ActionResult<Vehicle>> DeleteVehicleById(long id){
            try{
             var vehicle =  await _vehicleRepository.GetVehicleByIdAsync(id);
            await _vehicleRepository.DeleteVehicle(vehicle);
                 return Ok(vehicle);
            }catch{
                return BadRequest("Error during deleting vehicle");
            }
      
        }

        [HttpGet("getMainPhoto/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PhotoDto>> GetMainPhoto(long id){
           
            var vehicle =  await _vehicleRepository.GetVehicleByIdAsync(id);
            var mappedVehicle =  _mapper.Map<VehicleDto>(vehicle);
            foreach(var photo in mappedVehicle.Photos){
                if(photo.IsMain){
                    return Ok(photo);
                }
            }
            return BadRequest("Can't find photos");
            
             
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

        [HttpPut("editVehicle")]
        [AllowAnonymous]
        public async Task<IActionResult> EditVehicle(VehicleEditDto vehicleEdit){
            var vehicle = await _vehicleRepository.GetVehicleByIdAsync(vehicleEdit.VehicleId);
            vehicle.Type = vehicleEdit.Type ?? vehicle.Type;
            vehicle.Brand = vehicleEdit.Brand ?? vehicle.Brand;
            vehicle.Model = vehicleEdit.Model ?? vehicle.Model;
            vehicle.ProductionYear = vehicleEdit.ProductionYear ?? vehicle.ProductionYear;
            vehicle.Mileage = vehicleEdit.Mileage ?? vehicle.Mileage;
            vehicle.Fuel = vehicleEdit.Fuel ?? vehicle.Fuel;
            vehicle.Gearbox = vehicleEdit.Gearbox ?? vehicle.Gearbox;
            vehicle.Power = vehicleEdit.Power ?? vehicle.Power;
            vehicle.Engine = vehicleEdit.Engine ?? vehicle.Engine;
            vehicle.Color = vehicleEdit.Color ?? vehicle.Color;
             vehicle.IsCrashed = vehicleEdit.IsCrashed;
             try{
                 await _vehicleRepository.SaveAllAsyc();
             return Ok(vehicleEdit);
            }catch{
                 return BadRequest("Advertisment was not updated");
            }
        }



    }
}