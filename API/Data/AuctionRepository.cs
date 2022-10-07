using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;

namespace API.Data
{
    public class AuctionRepository : IAuctionService
    {

        private readonly AuctionContext _context;

        public AuctionRepository(AuctionContext context){
            _context = context;
        }
        public void AddVehicle(Auction auction)
        {
            throw new NotImplementedException();
        }

        public Task<Auction> DeleteVehicle(Auction auction)
        {
            throw new NotImplementedException();
        }

        public Task<Auction> GetVehicleByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Auction>> GetVehiclesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAllAsyc()
        {
            throw new NotImplementedException();
        }

        public void Update(Auction auction)
        {
            throw new NotImplementedException();
        }
    }
}