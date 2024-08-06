using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class CardParams
    {
        public int MinPrice { get; set; }

        public int MaxPrice { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public string Color { get; set; }
        public string Fuel { get; set; }

        public int MinYear { get; set; }

        public int MaxYear { get; set; }
    }
}