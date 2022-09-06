using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public class AuctionContext : DbContext
    {
        public AuctionContext(DbContextOptions<AuctionContext> options): base(options)         
        {      
        }  
         public DbSet<User> Users { get; set; }  
         public DbSet<Vehicle> Vehicles {get; set;}

         public DbSet<Photo> Photos {get; set;}

         public DbSet<Offer> Offers{get;set;}
         public DbSet<Auction> Auctions{get;set;}
         public DbSet<Advertisment> Advertisments{get;set;}
        
    }
}