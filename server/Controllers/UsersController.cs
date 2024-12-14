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
        public async Task<IActionResult> Post(User newObj)
        {
            newObj._key = Guid.NewGuid().ToString();
            newObj.regDate = DateTime.Now;
            newObj.editDate = null;
            newObj.indebtedness = 0;

            await _usersService.UserAddAsync(newObj);

            return CreatedAtAction(nameof(Get), new { key = newObj._key }, newObj);
        }

        [HttpPost("auth/")]
        public async Task<List<string>> Authenticate(string log, string psw)
        {
            return await _usersService.AuthenticateAsync(log, psw);
        }

        [HttpPost("all")]
        public async Task<List<User>> FilterDocsIndices(UserFilterBody body)
        {
            return await _usersService.FilterDocsAsync(body);
        }
    }
}
