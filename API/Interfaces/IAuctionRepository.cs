using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IAuctionRepository
    {
        void Update(Auction auction);
        Task<bool> SaveAllAsync();

        Task<IEnumerable<Auction>> GetAuctionsAsync();

        Task<Auction> GetAuctionByIdAsync(long id);

    
        void AddAuction(Auction auction);
        Task<Auction> DeleteAuction(Auction auction);

         Task<ActionResult<IEnumerable<Auction>>> getAuctionsByPage(int page);

          public Task<int> GetNumberOfAuctions();
    }
}