using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IVehicleRepository
    {
        void Update(Vehicle vehicle);
        Task<bool> SaveAllAsyc();

        Task<IEnumerable<Vehicle>> GetVehiclesAsync();

        Task<Vehicle> GetVehicleByIdAsync(long id);

        void AddVehicle(Vehicle vehicle);
        Task<Vehicle> DeleteVehicle(Vehicle vehicle);

    }
}