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


        [HttpGet]
        public async Task<List<User>> GetDocsIndices() =>
            await _usersService.ListDocsAsync();
    }
}
