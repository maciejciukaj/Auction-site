using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {

        public AutoMapperProfiles(){
            CreateMap<User, MemberDto>();
            CreateMap<Vehicle, VehicleDto>();
            CreateMap<Advertisment, AdvertismentDto>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<Auction, AuctionDto>();
        }
        
    }
}