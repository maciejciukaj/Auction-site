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

        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctionsByPage(int page, [FromQuery] CardParams cardParams)
        {
            int startingPoint = ((page - 1 ) * 6);
            var query = _context.Auctions.AsQueryable();
            query =  FilterRecords(query, cardParams);
            return await query.OrderBy(i => i.AuctionId).Skip(startingPoint).Take(6).ToListAsync();
        }

        public async Task<int> GetNumberOfAuctions([FromQuery] CardParams cardParams)
        {
            var query = _context.Auctions.AsQueryable();
            query = FilterRecords(query, cardParams);
            return await query.CountAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
           return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Auction auction)
        {
            _context.Entry(auction).State = EntityState.Modified;
        }
        public IQueryable<Auction> FilterRecords(IQueryable<Auction> query, CardParams cardParams){
            query = query.Where(x => Convert.ToInt32(x.CurrentPrice) >= cardParams.MinPrice && Convert.ToInt32(x.CurrentPrice) <= cardParams.MaxPrice);
            if(cardParams.Type!=null)
            query = query.Where(x => x.Vehicle.Type == cardParams.Type);
             if(cardParams.Brand!=null)
            query = query.Where(x => x.Vehicle.Brand == cardParams.Brand);
             if(cardParams.Fuel!=null)
            query = query.Where(x => x.Vehicle.Fuel == cardParams.Fuel);
             if(cardParams.Color!=null)
            query = query.Where(x => x.Vehicle.Color == cardParams.Color);
            query = query.Where(x => x.Vehicle.ProductionYear >= cardParams.MinYear &&  x.Vehicle.ProductionYear <= cardParams.MaxYear);
            return  query;
        }

        
    }
}