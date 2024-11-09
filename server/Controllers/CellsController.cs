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


        [HttpGet]
        public async Task<List<Cell>> GetDocsIndices() =>
            await _cellsService.ListDocsAsync();

        [HttpGet("{id}")]
        public async Task<Cell> Get(string id) =>
            await _cellsService.GetOneAsync(id);

        [HttpPost]
        public async Task<IActionResult> Post(int CNum, int TNum, float tar, float size, string WId)
        {
            Cell newObj = new Cell(CNum, TNum, tar, size, WId);

            await _cellsService.CellAddAsync(newObj);

            return CreatedAtAction(nameof(Get), new { id = newObj.Key }, newObj);
        }
    }
}

