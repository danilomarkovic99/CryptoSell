using CryptoSell.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq;


namespace CryptoSell.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdController : ControllerBase
    {
        MongoClient Client;
        IMongoDatabase Database;
        IMongoCollection<Ad> Collection;
        public AdController()
        {
            Client = new MongoClient("mongodb://localhost/?safe=true");
            Database = Client.GetDatabase("cryptosell");
            Collection = Database.GetCollection<Ad>("ads");
        }
        // GET: api/<AdController>
        [HttpGet(nameof(GetAdsSell))]
        public async Task<IActionResult> GetAdsSell()
        {
            var adList = Collection.Find(a => a.AdType == Enums.AdType.Sell).ToList();
            return Ok(adList);
        }
        [HttpGet(nameof(GetAdsBuy))]
        public async Task<IActionResult> GetAdsBuy()
        {
            var adList = Collection.Find(a => a.AdType == Enums.AdType.Buy).ToList();
            return Ok(adList);
        }


        // GET api/<AdController>/5
        [HttpGet("{uid}")]
        public async Task<IActionResult> Get(Guid uid)
        {
            
            Ad ad = Collection.Find(a => a.AdUid == uid).FirstOrDefault();
            if(ad==null)
            {
                return NotFound();
            }
            return Ok(ad);
        }

        // POST api/<AdController>
        [HttpPost]
        public void Post([FromBody]Ad ad)
        {
            ad.AdUid = Guid.NewGuid();
            //Ad ad = new Ad { AdStatus = Enums.AdStatus.Active, AdType = Enums.AdType.Sell, Coin = null, Advertiser = null, CryptoCurrencyAmount = 1.1, Customer = null, Price = 1800 };
            Collection.InsertOne(ad);

        }

        // PUT api/<AdController>/5
        [HttpPut]
        public void Put([FromBody]Ad ad)
        {
            Collection.ReplaceOne(a => a.AdUid == ad.AdUid, ad);
        }

        // DELETE api/<AdController>/5
        [HttpDelete("{uid}")]
        public void Delete(Guid uid)
        {
            Ad ad = Collection.Find(x => x.AdUid == uid).FirstOrDefault();
            ad.AdStatus = Enums.AdStatus.Archived;
            Collection.ReplaceOne(a => a.AdUid == uid, ad);
        }
    }
}
