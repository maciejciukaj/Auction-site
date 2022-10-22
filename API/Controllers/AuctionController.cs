using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
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
            Console.WriteLine(auction.CurrentPrice+"asfnasdfa"+priceEdit.UserOffer);
           if(priceEdit.UserOffer > auction.CurrentPrice){
                auction.CurrentPrice = priceEdit.UserOffer;
           }else{
            return Unauthorized("Your offer is to low");
           }
            Console.WriteLine(auction.CurrentPrice);
           // var auctionToReturn = _mapper.Map<AuctionDto>(auction);
            
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
        public async Task<int> GetNumberOfAuctions(){
            return await _auctionRepository.GetNumberOfAuctions();
        } 

        [HttpGet("getAuctionsByPage/{page}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Auction>>> GetCardsByPage(int page){
           // int pageNumber = Int32.Parse(page);
            return await _auctionRepository.getAuctionsByPage(page);
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



    




    }

   
}