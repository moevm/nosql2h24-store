using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using Warehouse2.Models;
using Warehouse2.Services;

namespace Warehouse2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            _usersService = usersService;
        }


        [HttpGet("all")]
        public async Task<List<User>> GetDocsIndices() =>
            await _usersService.ListDocsAsync();

        [HttpGet("{key}")]
        public async Task<User> Get(string key) =>
            await _usersService.GetOneAsync(key);

        [HttpPost("new")]
        public async Task<IActionResult> Post(User newObj)
        {
            newObj._key = Guid.NewGuid().ToString();
            newObj.regDate = DateTime.Now;
            newObj.editDate = DateTime.Now;
            newObj.indebtedness = 0;

            await _usersService.UserAddAsync(newObj);

            return CreatedAtAction(nameof(Get), new { key = newObj._key }, newObj);
        }

        [HttpPost("auth/")]
        public async Task<AuthData> Authenticate(PassData data)
        {
            return await _usersService.AuthenticateAsync(data);
        }

        [HttpPost("all")]
        public async Task<UserPage> FilterDocsIndices(UserFilterBody body)
        {
            return await _usersService.FilterDocsAsync(body);
        }

        [HttpGet("directorsKeys")]
        public async Task<List<string>> GetDirectorsKeys()
        {
            return await _usersService.ListDirectorsKeysAsync();
        }
    }
}
