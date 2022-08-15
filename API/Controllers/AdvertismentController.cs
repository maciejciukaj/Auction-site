using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdvertismentController : BaseApiController
    {
        private readonly AuctionContext _context;
        public AdvertismentController(AuctionContext context){
            _context = context;
        }

        [HttpGet("getAdvertisments")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Advertisment>>> GetAdvertisments(){
            
            
            return await _context.Advertisments.ToListAsync();
        }
        

        [HttpPost("addAdvertisments")]
        [AllowAnonymous]
        public async Task<ActionResult<Advertisment>> AddAdvertisments(Advertisment advertisment){

           

            var newAdvert = new Advertisment{
                Title = advertisment.Title,
                Description = advertisment.Description,
                Owner = advertisment.Owner,
                Price = advertisment.Price,
                User = advertisment.User,
                Vehicle = advertisment.Vehicle


            };
            _context.Advertisments.Add(newAdvert);
            await _context.SaveChangesAsync();

            return newAdvert;

            
            
        }
     

    }
}