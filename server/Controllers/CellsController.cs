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
    }
}

