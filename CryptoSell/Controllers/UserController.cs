using CryptoSell.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
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
    public class UserController : ControllerBase
    {
        MongoClient Client;
        IMongoDatabase Database;
        IMongoCollection<User> Collection;
        public UserController()
        {
            Client = new MongoClient("mongodb://localhost/?safe=true");
            Database = Client.GetDatabase("cryptosell");
            Collection = Database.GetCollection<User>("users");
        }

        [HttpGet]
        public List<User> Get()
        {
            return Collection.Find(x => true).ToList();
        }

        [HttpGet(nameof(GetUser))]
        public User GetUser(string username)
        {
            return Collection.Find<User>(x => x.UserName == username).FirstOrDefault();
        }

        [HttpPost(nameof(CreateUser))]
        public IActionResult CreateUser([FromBody] User user)
        {
            Collection.InsertOne(user);
            return CreatedAtRoute("User", new { id = user.Id.ToString() }, user);
        }

        [HttpPut(nameof(ChangePassword))]
        public IActionResult ChangePassword(string username, string password)
        {
            var filter = Builders<User>.Filter.Eq("UserName", username);
            var update = Builders<User>.Update.Set("Password", password);

            Collection.UpdateOne(filter, update);

            return Ok();
        }

        [HttpDelete(nameof(DeleteUser))]
        public IActionResult DeleteUser(string username)
        {
            Collection.DeleteOne(x => x.UserName == username);

            return Ok();
        }
    }
}
