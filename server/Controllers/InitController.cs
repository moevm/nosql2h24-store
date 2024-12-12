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

        [HttpPost("import")]
        public async Task<IActionResult> Import([FromBody] Data data)
        {
            
            if (data == null)
            {
                return BadRequest("Данные не были предоставлены.");
            }

            // Теперь вы можете использовать данные из объекта "data"

            await _initService.Import(data);

            return Ok(new { message = "Данные успешно получены!", data });
        }


        [HttpGet("export")]
        public async Task<IActionResult> ExportData()
        {
            Data data = await _initService.ExportData();

            if (data == null)
            {
                return NotFound("No data found");
            }

            return Ok(data); // Отправляем данные в формате JSON
        }
    }
}
