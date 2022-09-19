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
    public class CardController : BaseApiController
    {
        private readonly AuctionContext _context;
        public CardController(AuctionContext context){
            _context = context;
        }

        [HttpGet("getCards")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Advertisment>>> GetCards(){
            
            
            return await _context.Advertisments.ToListAsync();
        }

        [HttpGet("getCard/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Advertisment>> GetCardById(long id){
            
            
            return await _context.Advertisments.FirstOrDefaultAsync(i => i.AdvertismentId == id);
        }
        

        [HttpPost("addCard")]
        [Authorize]
        public async Task<ActionResult<Advertisment>> AddCard(Advertisment advertisment){

           

            var newAdvert = new Advertisment{
                Title = advertisment.Title,
                Description = advertisment.Description,
 
                Price = advertisment.Price,
                UserId = advertisment.UserId,
                VehicleId = advertisment.VehicleId


            };
            _context.Advertisments.Add(newAdvert);
            await _context.SaveChangesAsync();

            return newAdvert;

            
        }
    
    }
}