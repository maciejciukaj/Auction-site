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
            //_context.Advertisments.Count();
            
            return await _context.Advertisments.ToListAsync();
        }

        [HttpGet("getNumberOfCards")]
        [AllowAnonymous]
        public async Task<int> GetNumberOfCards(){
            return await _context.Advertisments.CountAsync();
        } 

        [HttpGet("getCardsByPage/{page}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Advertisment>>> getCardsByPage(int page){
           // int pageNumber = Int32.Parse(page);
            int startingPoint = ((page - 1 ) * 6);
            
           
            return await _context.Advertisments.OrderBy(i => i.AdvertismentId).Skip(startingPoint).Take(6).ToListAsync();
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