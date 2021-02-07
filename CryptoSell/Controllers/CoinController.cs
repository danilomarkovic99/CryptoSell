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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var coinList = Collection.Find<Coin>(c => true).ToList();
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
        public void CreateCoin(Coin coin)
        {
            Collection.InsertOne(coin);      
        }

        [HttpPut(nameof(ChangeCoin))]
        public void ChangeCoin([FromBody] Coin coin)
        {
            Collection.ReplaceOne(c => c.Symbol == coin.Symbol, coin);
        }

        [HttpDelete(nameof(DeleteCoinBySymbol))]
        public void DeleteCoinBySymbol(string sym)
        {
            Collection.DeleteOne(c => c.Symbol == sym);
        }
    }
}
