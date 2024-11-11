using Microsoft.AspNetCore.Mvc;
using Warehouse2.Models;
using Warehouse2.Services;

namespace Warehouse2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InitController : ControllerBase
    {
        private readonly InitService _initService;

        public InitController(InitService initService)
        {
            _initService = initService;
        }


        [HttpGet("create")]
        public async Task Create() =>
            await _initService.Create();

    }
}
