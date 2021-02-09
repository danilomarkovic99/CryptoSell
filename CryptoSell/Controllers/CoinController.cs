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

        [HttpGet(nameof(GetCoins))]
        public async Task<IActionResult> GetCoins()
        {
            var coinList = Collection.Find<Coin>(c => true).SortByDescending(x => x.MarketPrice).ToList();
            return Ok(coinList);
        }

        [HttpGet(nameof(GetCoin))]
        public async Task<IActionResult> GetCoin(string sym)
        {

            Coin coin = Collection.Find<Coin>(c => c.Symbol == sym).FirstOrDefault();
            if (coin == null)
            {
                return NotFound();
            }
            return Ok(coin);
        }

        [HttpPost(nameof(CreateCoin))]
        public async Task<IActionResult> CreateCoin(Coin coin)
        {
            var c = Collection.Find(c => c.Symbol == coin.Symbol || c.Name == coin.Name).FirstOrDefault();

            if (c == null)
                Collection.InsertOne(coin);
            else
                return BadRequest();

            return StatusCode(200);
        }

        [HttpPut(nameof(ChangeCoinPrice))]
        public async Task<IActionResult> ChangeCoinPrice(string sym, string market)
        {
            var filter = Builders<Coin>.Filter.Eq("Symbol", sym);
            var update = Builders<Coin>.Update.Set("MarketPrice", market);

            Collection.UpdateOne(filter, update);

            return Ok(filter);
        }

        [HttpDelete(nameof(DeleteCoinBySymbol))]
        public void DeleteCoinBySymbol(string sym)
        {
            Collection.DeleteOne(c => c.Symbol == sym);
        }
    }
}
