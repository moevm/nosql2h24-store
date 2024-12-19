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

        [HttpPost("EventWarehouse")]
        public async Task<List<WarehouseCellsCount>> CountRentedCellsAsync(Period period)
        {
            return await _statisticsService.CountRentCells(period);
        }

        
        [HttpPost("EventUser")]
        public async Task<List<EmployeeFixedCell>> CountFixedCellsAsync(Period period)
        {
            return await _statisticsService.CountProd(period);
        }


        [HttpPost("EventCell")]
        public async Task<List<EventCell>> CellActionCountAsync(ActionBody body)
        {
            return await _statisticsService.CountCellEvents(body);
        }
    }
}
