using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver;
using CryptoSell.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CryptoSell.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CoinController : ControllerBase
    {
        MongoClient Client;
        IMongoDatabase Database;
        IMongoCollection<Coin> Collection;
        public CoinController()
        {
            Client = new MongoClient("mongodb://localhost/?safe=true");
            Database = Client.GetDatabase("cryptosell");
            Collection = Database.GetCollection<Coin>("coins");
        }
        // GET: api/<CoinController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var coinList = Collection.Find<Coin>(c => true).ToList();
            return Ok(coinList);
        }

        // GET api/<CoinController>/5
        [HttpGet("{sym}")]
        public async Task<IActionResult> Get(string sym)
        {

            Coin coin = Collection.Find<Coin>(c => c.Symbol == sym).FirstOrDefault();
            if (coin == null)
            {
                return NotFound();
            }
            return Ok(coin);
        }

        // POST api/<CoinController>
        [HttpPost]
        public void Post(Coin coin)
        {
            Collection.InsertOne(coin);      
        }

        // PUT api/<CoinController>/5
        [HttpPut]
        public void Put([FromBody] Coin coin)
        {
            Collection.ReplaceOne(c => c.Symbol == coin.Symbol, coin);
        }

        // DELETE api/<CoinController>/5
        [HttpDelete("{sym}")]
        public void Delete(string sym)
        {
            Collection.DeleteOne(c => c.Symbol == sym);
        }
    }
}
