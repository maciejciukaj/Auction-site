using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
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
             return await _context.Vehicles.FindAsync(id);
        }

        public async Task<IEnumerable<Vehicle>> GetVehiclesAsync()
        {
            return await _context.Vehicles.Include(a => a.Advertisments).AsSplitQuery().ToListAsync();
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

    
    }
}