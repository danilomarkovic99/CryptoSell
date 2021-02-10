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
            var adList = Collection.Find(a => a.AdType == Enums.AdType.Sell && a.AdStatus == Enums.AdStatus.Active).ToList();
            return Ok(adList);
        }

        [HttpGet(nameof(GetAdsBuy))]
        public async Task<IActionResult> GetAdsBuy()
        {
            var adList = Collection.Find(a => a.AdType == Enums.AdType.Buy && a.AdStatus == Enums.AdStatus.Active).ToList();

            if (adList == null)
                return BadRequest();

            return Ok(adList);
        }

        [HttpGet(nameof(GetAd))]
        public async Task<IActionResult> GetAd(Guid uid)
        {
            Ad ad = Collection.Find(a => a.AdUid == uid).FirstOrDefault();

            if (ad == null)
                return BadRequest();

            return Ok(ad);
        }

        [HttpGet(nameof(GetUserActiveAds))]
        public async Task<IActionResult> GetUserActiveAds(string username)
        {
            var activeAds = Collection.Find(x => (x.AdStatus == Enums.AdStatus.Active || x.AdStatus == Enums.AdStatus.Processing || x.AdType == Enums.AdType.Buy || x.AdType == Enums.AdType.Sell) && x.Advertiser.UserName == username).ToList();

            if (activeAds == null)
                return BadRequest();

            return Ok(activeAds);
        }

        [HttpGet(nameof(GetUserProcessingAds))]
        public async Task<IActionResult> GetUserProcessingAds(string username)
        {
            var processingAds = Collection.Find(x => x.AdStatus == Enums.AdStatus.Processing && x.Customer.UserName == username).ToList();

            if (processingAds == null)
                return BadRequest();

            return Ok(processingAds);
        }

        [HttpPost(nameof(CreateAd))]
        public void CreateAd([FromBody]Ad ad)
        {
            ad.AdUid = Guid.NewGuid();
           
            Collection.InsertOne(ad);
        }

        [HttpPut(nameof(BuyCoin))]
        public IActionResult BuyCoin([FromBody] Ad ad)
        {
            var buyAd = Collection.Find(x => x.AdUid == ad.AdUid).FirstOrDefault();
            buyAd.AdStatus = Enums.AdStatus.Processing;
            buyAd.TransactionNumber += 1;
            Collection.ReplaceOne(x => x.AdUid == buyAd.AdUid, buyAd);
            return Ok(buyAd);
        }

        [HttpPut(nameof(ChangeAd))]
        public void ChangeAd([FromBody]Ad ad)
        {
            Collection.ReplaceOne(a => a.AdUid == ad.AdUid, ad);
        }

        [HttpDelete(nameof(DeleteByGuid))]
        public void DeleteByGuid(Guid uid)
        {
            Collection.DeleteOne<Ad>(a => a.AdUid == uid);
        }
    }
}
