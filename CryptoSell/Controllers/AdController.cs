using CryptoSell.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AdController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AdController>
        [HttpPost]
        public void Post(string value)
        {
            
            Coin c = new Coin { Symbol = "POLS", MarketPrice = 2.2, Name = "PolkaStarter" };
            Ad ad = new Ad { AdStatus = Enums.AdStatus.Active, AdType = Enums.AdType.Sell, Coin = null, Advertiser = null, CryptoCurrencyAmount = 1.1, Customer = null, Price = 1800 };
            Collection.InsertOne(ad);
        }

        // PUT api/<AdController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AdController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
