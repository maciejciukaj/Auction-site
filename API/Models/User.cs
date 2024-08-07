using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        public long UserId { get; set; }
        public string UserName { get; set; }

        public int Status { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public string PasswordResetToken { get; set; }

        public DateTime? ResetTokenExpires { get; set; }

        public ICollection<Offer> Offers { get; set; }

        public ICollection<Auction> Auctions { get; set; }

        public ICollection<Vehicle> Vehicles { get; set; }

        public ICollection<Advertisment> Advertisments { get; set; }




    }
}