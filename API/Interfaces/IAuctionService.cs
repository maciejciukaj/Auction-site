using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IAuctionService
    {
        void Update(Auction auction);
        Task<bool> SaveAllAsyc();

        Task<IEnumerable<Auction>> GetVehiclesAsync();

        Task<Auction> GetVehicleByIdAsync(long id);

        void AddVehicle(Auction auction);
        Task<Auction> DeleteVehicle(Auction auction);
    }
}