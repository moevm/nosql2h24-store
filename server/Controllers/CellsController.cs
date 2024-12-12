using Microsoft.AspNetCore.Mvc;
using Warehouse2.Models;
using Warehouse2.Services;

namespace Warehouse2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CellsController : ControllerBase
    {
        private readonly CellsService _cellsService;

        public CellsController(CellsService cellsService)
        {
            _cellsService = cellsService;
        }


        [HttpGet("all")]
        public async Task<List<Cell>> GetDocsIndices() =>
            await _cellsService.ListDocsAsync();

        [HttpGet("{key}")]
        public async Task<Cell> Get(string key) =>
            await _cellsService.GetOneAsync(key);

        [HttpPost("new")]
        public async Task<IActionResult> Post(Cell newObj)
        {
            newObj._key = Guid.NewGuid().ToString();
            newObj.isFree = true;
            newObj.needService = false;
            newObj.endOfRent = null;
            newObj.listOfEventKeys = new List<string>();

            await _cellsService.CellAddAsync(newObj);

            return CreatedAtAction(nameof(Get), new { key = newObj._key }, newObj);
        }

        [HttpPost("all")]
        public async Task<List<Cell>> FilterDocsIndices(FilterBody body)
        {
            // на числовые параметры зададим верхнюю и нижнюю границы по умолчанию
            
            //FilterBody tbody = new FilterBody();
            //tbody._key = key;
            //tbody.warehouseKey = WKey;
            /*body.needService = false;
            body.endcellNum = 21;
            body.endtierNum = 6;
            body.endsize = 2.1f;
            body.endtariffPerDay = 5001;*/
            //body.startendOfRent = new DateTime();
            //body.endendOfRent = new DateTime(2100, 1, 1);

            return await _cellsService.FilterDocsAsync(body);
        }
    }
}

