using Microsoft.AspNetCore.Mvc;
using Warehouse2.Services;
using Warehouse2.Models;

namespace Warehouse2.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class StatisticsController : ControllerBase
    {
        private readonly StatisticsService _statisticsService;

        public StatisticsController(StatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet("CountCellsWarehouse")]
        public async Task<List<WarehouseCellsCount>> CountCellsAsync()
        {
            return await _statisticsService.CountCellsWarehouses();
        }
    }
}
