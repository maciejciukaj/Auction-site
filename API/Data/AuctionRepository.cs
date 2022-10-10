using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AuctionRepository : IAuctionRepository
    { 
       



        private readonly AuctionContext _context;

        public AuctionRepository(AuctionContext context){
            _context = context;
        }

        public void AddAuction(Auction auction)
        {
            throw new NotImplementedException();
        }

        public Task<Auction> DeleteAuction(Auction auction)
        {
            throw new NotImplementedException();
        }

        public async Task<Auction> GetAuctionByIdAsync(long id)
        {
            return await _context.Auctions.Include(o => o.Offers).FirstOrDefaultAsync(a => a.AuctionId == id);
        }

        public async Task<IEnumerable<Auction>> GetAuctionsAsync()
        {
            return await _context.Auctions.Include(o => o.Offers).ToListAsync();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }

        public void Update(Auction auction)
        {
            throw new NotImplementedException();
        }
    }
}