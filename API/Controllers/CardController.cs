using API.Models;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using API.Helpers;

namespace API.Controllers
{
    [Authorize]
    public class CardController : BaseApiController
    {
        private readonly AuctionContext _context;
        public CardController(AuctionContext context)
        {
            _context = context;
        }

        [HttpGet("getCards")]

        public async Task<ActionResult<IEnumerable<Advertisment>>> GetCards()
        {
            return await _context.Advertisments.ToListAsync();
        }

        [HttpGet("getNumberOfCards")]

        public async Task<int> GetNumberOfCards([FromQuery] CardParams cardParams)
        {
            var query = _context.Advertisments.AsQueryable();
            query = FilterRecords(query, cardParams);
            return await query.CountAsync();
        }

        [HttpGet("getCardsByPage/{page}")]

        public async Task<ActionResult<IEnumerable<Advertisment>>> getCardsByPage(int page, [FromQuery] CardParams cardParams)
        {
            int startingPoint = ((page - 1) * 6);
            var query = _context.Advertisments.AsQueryable();
            query = FilterRecords(query, cardParams);
            return await query.OrderBy(i => i.AdvertismentId).Skip(startingPoint).Take(6).ToListAsync();
        }

        [HttpGet("getCard/{id}")]

        public async Task<ActionResult<Advertisment>> GetCardById(long id)
        {
            return await _context.Advertisments.FirstOrDefaultAsync(i => i.AdvertismentId == id);
        }

        [HttpPost("addCard")]

        public async Task<ActionResult<Advertisment>> AddCard(Advertisment advertisment)
        {
            var newAdvert = new Advertisment
            {
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

        [HttpPut("editCard")]

        public async Task<IActionResult> EditAdvertisment(AdvertismentEditDto advertismentEdit)
        {
            var advertisment = await _context.Advertisments.FirstOrDefaultAsync(i => i.AdvertismentId == advertismentEdit.AdvertismentId);
            advertisment.Title = advertismentEdit.Title ?? advertisment.Title;
            advertisment.Price = advertismentEdit.Price ?? advertisment.Price;
            advertisment.Description = advertismentEdit.Description ?? advertisment.Description;
            try
            {
                await _context.SaveChangesAsync();
                return Ok(advertismentEdit);
            }
            catch
            {
                return BadRequest("Advertisment was not updated");
            }
        }

        private IQueryable<Advertisment> FilterRecords(IQueryable<Advertisment> query, CardParams cardParams)
        {
            query = query.Where(x => Convert.ToInt32(x.Price) >= cardParams.MinPrice && Convert.ToInt32(x.Price) <= cardParams.MaxPrice);
            if (cardParams.Type != null)
                query = query.Where(x => x.Vehicle.Type == cardParams.Type);
            if (cardParams.Brand != null)
                query = query.Where(x => x.Vehicle.Brand == cardParams.Brand);
            if (cardParams.Fuel != null)
                query = query.Where(x => x.Vehicle.Fuel == cardParams.Fuel);
            if (cardParams.Color != null)
                query = query.Where(x => x.Vehicle.Color == cardParams.Color);
            query = query.Where(x => x.Vehicle.ProductionYear >= cardParams.MinYear && x.Vehicle.ProductionYear <= cardParams.MaxYear);
            return query;
        }
    }
}