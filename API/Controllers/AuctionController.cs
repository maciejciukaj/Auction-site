using API.DTOs;
using API.Helpers;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuctionController :BaseApiController
    {
        private readonly IMapper _mapper;
        
        private readonly IAuctionRepository _auctionRepository;

         public AuctionController(IMapper mapper, IAuctionRepository auctionRepository){
        _mapper = mapper;
        _auctionRepository = auctionRepository;
        }

        [HttpGet("getAuctions")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AuctionDto>>> GetAuctions(){
            var auctions = await _auctionRepository.GetAuctionsAsync();
            var auctionsToReturn =  _mapper.Map<IEnumerable<AuctionDto>>(auctions);
            return  Ok(auctionsToReturn);
        }

        [HttpGet("getAuction/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<AuctionDto>> GetAuctionyById(long id){
            try{
            var auction =  await _auctionRepository.GetAuctionByIdAsync(id);
            return _mapper.Map<AuctionDto>(auction);
            }catch{
                return BadRequest("Auction doesn't exist");
            }
        }


        [HttpGet("getAuctionAlt/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Auction>> GetAuctionyByIdAlt(long id){
            return  await _auctionRepository.GetAuctionByIdAsync(id);
        }

        [HttpPost("editCurrentPrice")]
        [AllowAnonymous]
        public async Task<ActionResult> EditCurrentPrice(PriceEditDto priceEdit){
            var auction = await _auctionRepository.GetAuctionByIdAsync(priceEdit.AuctionId);
            if(priceEdit.UserOffer > auction.CurrentPrice){
                auction.CurrentPrice = priceEdit.UserOffer;
                auction.CurrentBidder = priceEdit.Username;
           }else{
            return Unauthorized("Your offer is to low");
           }
             try{
               await _auctionRepository.SaveAllAsync();
                return Ok();
            }catch{
                return BadRequest("Auction was not updated");
            }
        }

        [HttpGet("getCurrentPrice/{auctionId}")]
        [Authorize]
        public async Task<ActionResult<float>> GetAuctionPrice(long auctionId){
            var auction = await _auctionRepository.GetAuctionByIdAsync(auctionId);
            return auction.CurrentPrice;
        }

        [HttpGet("getNumberOfAuctions")]
        [AllowAnonymous]
        public async Task<int> GetNumberOfAuctions([FromQuery] CardParams cardParams){
            return await _auctionRepository.GetNumberOfAuctions(cardParams);
        } 

        [HttpGet("getAuctionsByPage/{page}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Auction>>> GetCardsByPage(int page, [FromQuery] CardParams cardParams){
            return await _auctionRepository.GetAuctionsByPage(page,cardParams);
        }

        [HttpPost("addAuction")]
        [AllowAnonymous]
        public async Task<ActionResult<Auction>> AddAuction(AuctionFormDto auction){
             var newAuction = new Auction{
               Title = auction.Title,
               Description = auction.Description,
               CurrentPrice =auction.CurrentPrice,
               CurrentBidder = null,
               Start = DateTime.Now,
               End = DateTime.Now.AddDays(auction.Duration),
               IsFinished = false,
               AuctionWinner = null,
               UserId = auction.UserId,
               VehicleId = auction.VehicleId
            };
            _auctionRepository.AddAuction(newAuction);
            await _auctionRepository.SaveAllAsync();
            return newAuction;
        }

          private IQueryable<Advertisment> FilterRecords(IQueryable<Advertisment> query, CardParams cardParams){
            query = query.Where(x => Convert.ToInt32(x.Price) >= cardParams.MinPrice && Convert.ToInt32(x.Price) <= cardParams.MaxPrice);
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