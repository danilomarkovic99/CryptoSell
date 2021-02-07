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

        [HttpGet(nameof(GetAd))]
        public async Task<IActionResult> GetAd(Guid uid)
        {
            
            Ad ad = Collection.Find(a => a.AdUid == uid).FirstOrDefault();
            if(ad==null)
            {
                return NotFound();
            }
            return Ok(ad);
        }

        [HttpPost(nameof(CreateAd))]
        public void CreateAd([FromBody]Ad ad)
        {
            ad.AdUid = Guid.NewGuid();
           
            Collection.InsertOne(ad);

        }

        [HttpPut(nameof(ChangeAd))]
        public void ChangeAd([FromBody]Ad ad)
        {
            Collection.ReplaceOne(a => a.AdUid == ad.AdUid, ad);
        }

        [HttpDelete(nameof(DeleteByGuid))]
        public void DeleteByGuid(Guid uid)
        {
            Ad ad = Collection.Find(x => x.AdUid == uid).FirstOrDefault();
            ad.AdStatus = Enums.AdStatus.Archived;
            Collection.ReplaceOne(a => a.AdUid == uid, ad);
        }
    }
}
