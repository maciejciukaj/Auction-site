using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PhotoController : BaseApiController
    {
        private readonly AuctionContext _context;
        public PhotoController(AuctionContext context){
            _context = context;
        }

        [HttpPost("addPhoto")]
        [Authorize]
        public async Task<ActionResult<Photo>> AddPhoto(Photo photo){
            var newPhoto = new Photo{
                PhotoUrl = photo.PhotoUrl,
                IsMain = photo.IsMain,
                Position = photo.Position,
                VehicleId = photo.VehicleId


            };
            _context.Photos.Add(newPhoto);
            await _context.SaveChangesAsync();

            return newPhoto;
        }


        [HttpGet("getPhotos")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Photo>>> GetPhotos(){
            return await  _context.Photos.ToListAsync();
        }

        
    }
}