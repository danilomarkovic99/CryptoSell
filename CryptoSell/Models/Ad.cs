﻿using CryptoSell.Enums;
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
        public MongoDBRef Coin { get; set; }
        public float Price { get; set; }
        public float CryptoCurrencyAmount { get; set; }
        public AdType AdType { get; set; }
        public AdStatus AdStatus { get; set; }
        public MongoDBRef Advertiser { get; set; }
        public MongoDBRef Customer { get; set; }
    }
}