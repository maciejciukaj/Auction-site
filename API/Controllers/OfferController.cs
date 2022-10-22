using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OfferController : BaseApiController
    {

        private readonly IMapper _mapper;
        private readonly AuctionContext _context;

        public OfferController(AuctionContext context,IMapper mapper){
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("getOffers")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffers(){
            
           var offers =  await _context.Offers.ToListAsync();
            var offerToReturn =  _mapper.Map<IEnumerable<OfferDto>>(offers);
            return Ok(offerToReturn);

        }

        [HttpGet("getOffersById")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffersByAuctionId(long auctionId){
            
           var offers =  await _context.Offers.Where(i => i.AuctionId == auctionId).ToListAsync();
            var offerToReturn =  _mapper.Map<IEnumerable<OfferDto>>(offers);
            return Ok(offerToReturn);
        }

        [HttpGet("getHighestOfferById")]
        [AllowAnonymous]
        public async Task<ActionResult<Offer>> GetHighestOfferByAuctionId(long auctionId){
            
           var offer =  await _context.Offers.FirstOrDefaultAsync(i => i.AuctionId == auctionId);
           
            return Ok(offer);
        }

        [HttpPost("addOffer")]
        [AllowAnonymous]
        public async Task<ActionResult<Offer>> AddOffer(Offer offer){
            var newOffer = new Offer{
                OfferAmount = offer.OfferAmount,
                AuctionId = offer.AuctionId,
                UserId = offer.UserId
            };
            _context.Offers.Add(newOffer);
            await _context.SaveChangesAsync();

            return newOffer;
        }

     

        
        
    }
}