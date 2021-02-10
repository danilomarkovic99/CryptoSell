using CryptoSell.Enums;
using CryptoSell.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CryptoSell.DTOs
{
    public class AdDTO
    {
        public string Symbol { get; set; }
        public double Amount { get; set; }
        public double Price { get; set; }
        public string Advertiser { get; set; }
        public AdType AdType { get; set; }
    }
}
