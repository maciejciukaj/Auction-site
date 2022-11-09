using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly AuctionContext _context;
        public VehicleRepository(AuctionContext context){
            _context = context;
        }    
        
            public async Task<Vehicle> GetVehicleByIdAsync(long id)
        {
             return await _context.Vehicles.Include(a => a.Advertisments).Include(a => a.Photos).Include(a => a.Auctions).AsSplitQuery().FirstOrDefaultAsync(i => i.VehicleId == id);
        }

        public async Task<IEnumerable<Vehicle>> GetVehiclesAsync()
        {
            return await _context.Vehicles.Include(a => a.Advertisments).Include(a => a.Photos).Include(a => a.Auctions).AsSplitQuery().ToListAsync();
        }

        public async Task<bool> SaveAllAsyc()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Vehicle vehicle)
        {
             _context.Entry(vehicle).State = EntityState.Modified;
        }

        public void AddVehicle(Vehicle vehicle){
            _context.Vehicles.Add(vehicle);

        }

        public  async Task<Vehicle> DeleteVehicle(Vehicle vehicle)
        {
            _context.Remove(vehicle);
            await _context.SaveChangesAsync();
            return vehicle;
        }
      
        public async Task<IEnumerable<Vehicle>> GetFilteredVehicles ([FromQuery] VehicleParams vehicleParams){
            var query = _context.Vehicles.AsQueryable();
            if(vehicleParams.Type!=null)
            query = query.Where(x => x.Type == vehicleParams.Type);
             if(vehicleParams.Brand!=null)
            query = query.Where(x => x.Brand == vehicleParams.Brand);
             if(vehicleParams.Fuel!=null)
            query = query.Where(x => x.Fuel == vehicleParams.Fuel);
             if(vehicleParams.Color!=null)
            query = query.Where(x => x.Color == vehicleParams.Color);
            query = query.Where(x => x.ProductionYear >= vehicleParams.MinYear &&  x.ProductionYear <= vehicleParams.MaxYear);

            return await query.ToListAsync();
        }
    }
}