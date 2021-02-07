using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CryptoSell.Models
{
    public class Coin
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }
        public double MarketPrice { get; set; }
    }
}
