using CryptoSell.Enums;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CryptoSell.Models
{
    public class Ad
    {
        public ObjectId Id { get; set; }
        public Guid AdUid { get; set; }
        public Coin Coin { get; set; }
        public double Price { get; set; }
        public double CryptoCurrencyAmount { get; set; }
        public AdType AdType { get; set; }
        public AdStatus AdStatus { get; set; }
        public User Advertiser { get; set; }
        public User Customer { get; set; }
        public int TransactionNumber { get; set; }
    }
}
