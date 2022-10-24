using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
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
            _context.Auctions.Add(auction);
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


        public async Task<Auction> GetAuctionByIdAsyncAlternate(long id)
        {
             return await _context.Auctions.Include(o => o.Offers).FirstOrDefaultAsync(i => i.AuctionId == id);
        }

        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctionsByPage(int page)
        {
            int startingPoint = ((page - 1 ) * 6);
           
            return await _context.Auctions.OrderBy(i => i.AuctionId).Skip(startingPoint).Take(6).ToListAsync();
        }

        public async Task<int> GetNumberOfAuctions()
        {
           return await _context.Auctions.CountAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
           return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Auction auction)
        {
            _context.Entry(auction).State = EntityState.Modified;
        }

/*        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctionsByIdList(List<long> auctionIdList)
        {
           return await _context.Auctions.Where(t => auctionIdList.Contains(t.AuctionId)).ToListAsync();
        }*/
    }
}