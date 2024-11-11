using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Post(string NSP, string role, string log, string psw, string bd)
        {
            User newObj = new User(NSP, role, log, psw, bd);

            await _usersService.UserAddAsync(newObj);

            return CreatedAtAction(nameof(Get), new { key = newObj._key }, newObj);
        }

        [HttpPost("auth/")]
        public async Task<List<string>> Authenticate(string log, string psw)
        {
            return await _usersService.AuthenticateAsync(log, psw);
        }
    }
}
